import { connectDB } from "@/lib/mongodb";
import Link from "@/models/Link";
import sanitize from "mongo-sanitize";
import validator from "validator";

// Define secure headers
const secureHeaders = {
  "Content-Type": "application/json",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cache-Control": "no-store",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; base-uri 'none';",
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);

    const rawShortUrl = searchParams.get("_url_");

    const showValue = body.show || []
    let selectValues = ""

    showValue.forEach(items => {
      selectValues += items
    });



    // Validate input presence
    if (!rawShortUrl) {
      return new Response(JSON.stringify({
        success: false,
        message: "Short URL parameter is missing"
      }), {
        status: 400,
        headers: secureHeaders,
      });
    }

    // Sanitize and validate format
    const shorter_url = sanitize(rawShortUrl).trim();
    const isValidFormat = /^[a-zA-Z0-9_-]{6,20}$/.test(shorter_url); // allow short_code format

    if (!isValidFormat) {
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid short URL format"
      }), {
        status: 400,
        headers: secureHeaders,
      });
    }

    await connectDB();

    // Find and select safe fields only
    const link = await Link.findOne({ short_url: shorter_url })
      .select(selectValues || "url short_url clicks expiration neverExpires createdAt")
      .lean();

    if (!link) {
      return new Response(JSON.stringify({
        success: false,
        message: "Link not found"
      }), {
        status: 404,
        headers: secureHeaders,
      });
    }

    // Optional: skip increment if expired
    if (!link.neverExpires && link.expiration && new Date(link.expiration) < new Date()) {
      return new Response(JSON.stringify({
        success: false,
        message: "Link has expired"
      }), {
        status: 410,
        headers: secureHeaders,
      });
    }

    // Increment clicks (non-blocking)
    Link.updateOne({ short_url: shorter_url }, { $inc: { clicks: 1 } }).catch(() => {
      console.warn("Failed to increment clicks, but continuing.");
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Link fetched successfully",
      data: link
    }), {
      status: 200,
      headers: secureHeaders,
    });

  } catch (error) {
    console.error("Error fetching link:", error);

    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error"
    }), {
      status: 500,
      headers: secureHeaders,
    });
  }
};
