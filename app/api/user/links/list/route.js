import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Link from "@/models/Link";

const secureHeaders = {
  "Content-Type": "application/json",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Cache-Control": "no-store",
  "Referrer-Policy": "no-referrer",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'none'; object-src 'none'; frame-ancestors 'none';",
};

export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: secureHeaders }
      );
    }

    const { searchParams } = new URL(req.url);
    const sort_ = searchParams.get("sort");
    const page = parseInt(searchParams.get("page")) || 1;
    const perPage = parseInt(searchParams.get("perpage")) || 2;

    await connectDB();

    const user = await User.findOne({ email: session.user.email })
      .select("_id")
      .lean();

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404, headers: secureHeaders }
      );
    }

    const totalLinks = await Link.countDocuments({ creator: user._id });
    const totalPages = Math.ceil(totalLinks / perPage);
    const hasNextPage = page < totalPages;

    const links = await Link.find({ creator: user._id })
      .select("short_url url expiration neverExpires clicks createdAt updatedAt")
      .sort(
        ...[
          sort_ === "created"
            ? { createdAt: -1 }
            : sort_ === "clicks"
              ? { clicks: -1 }
              : {},
        ]
      )
      .skip(perPage * (page - 1))
      .limit(perPage)
      .lean();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Links fetched successfully",
        data: links,
        currentPage: page,
        perPage,
        totalLinks,
        totalPages,
        hasNextPage,
      }),
      { status: 200, headers: secureHeaders }
    );
  } catch (error) {
    console.error("Fetch links error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
      }),
      { status: 500, headers: secureHeaders }
    );
  }
};
