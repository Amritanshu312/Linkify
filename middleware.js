import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const RATE_LIMIT = new Map();
const BLOCKLIST = new Set();
const MAX_ATTEMPTS = 10;
const TIME_WINDOW = 1000;
const excludingPaths = [
  '/api/user/links/info'
]

export async function middleware(req) {
  const clientIp = req.headers.get("x-forwarded-for") || req.ip;
  const url = req.nextUrl.pathname

  // Blocklisted IP check
  if (BLOCKLIST.has(clientIp)) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  // Rate limiting
  const currentTime = Date.now();
  if (RATE_LIMIT.has(clientIp)) {
    const { attempts, firstAttemptTime } = RATE_LIMIT.get(clientIp);
    if (attempts >= MAX_ATTEMPTS && currentTime - firstAttemptTime < TIME_WINDOW) {
      BLOCKLIST.add(clientIp);
      return NextResponse.json({ message: "Too many requests" }, { status: 429 });
    }
    RATE_LIMIT.set(clientIp, { attempts: attempts + 1, firstAttemptTime });
  } else {
    RATE_LIMIT.set(clientIp, { attempts: 1, firstAttemptTime: currentTime });
  }

  if (excludingPaths.includes(url)) {
    return NextResponse.next()
  }


  // Get NextAuth token from cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/user/:path*"
  ],
};
