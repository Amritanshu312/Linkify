import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Link from "@/models/Link";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email }).lean().select("-password"); // Exclude sensitive fields

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const totalClicksAgg = await Link.aggregate([
      { $match: { creator: user._id } },
      { $group: { _id: null, total: { $sum: "$clicks" } } }
    ]);
    const totalClicks = totalClicksAgg[0]?.total || 0;

    return new Response(JSON.stringify({ ...user, totalClicks }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
