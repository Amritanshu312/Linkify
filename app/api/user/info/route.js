import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { encrypt } from "@/lib/crypto";

export const GET = async (req) => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || null
  const encryptedData = {}

  if (session && userEmail) {
    await connectDB()
    const user = await User.findOne({ email: userEmail });

    if (user) {
      for (const [key, value] of Object.entries(user?._doc)) {
        try {
          encryptedData[key] = encrypt(value)
        } catch (error) {
          encryptedData[key] = value
        }
      }
      console.log(encryptedData)
    }
  }


  if (session) {
    return new Response(JSON.stringify(encryptedData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ message: "Forbidden" }),
    { status: 401, headers: { "Content-Type": "application/json" } }
  );
};
