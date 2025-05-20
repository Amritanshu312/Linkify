import { connectDB } from '@/lib/mongodb';
import Link from '@/models/Link';
import sanitize from 'mongo-sanitize';
import { Types } from 'mongoose';

// Defined secure headers
const secureHeaders = {
  'Content-Type': 'application/json',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin', // More flexible than 'no-referrer'
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate', // More comprehensive
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()', // Good
  'X-Frame-Options': 'DENY', // Good
  'Content-Security-Policy':
    "default-src 'self'; frame-ancestors 'none'; base-uri 'self';", // 'self' is often a good starting point for default-src
  'X-XSS-Protection': '1; mode=block', // For older browsers that support it
};

// --- Helper function for consistent error responses ---
const sendErrorResponse = (message, status) => {
  return new Response(
    JSON.stringify({
      success: false,
      message: message,
    }),
    {
      status: status,
      headers: secureHeaders,
    }
  );
};

export const DELETE = async (request) => {
  try {
    // Method Check (Though Next.js routing usually handles this, explicit check is good practice)
    if (request.method !== 'DELETE') {
      return sendErrorResponse('Method Not Allowed', 405);
    }

    const { searchParams } = new URL(request.url);
    const delete_id = searchParams.get('_id');

    //  Enhanced Input Validation for _id
    if (!delete_id) {
      return sendErrorResponse('Delete ID parameter is missing', 400);
    }
    // Validate if it's a
    if (!Types.ObjectId.isValid(delete_id)) {
      return sendErrorResponse('Invalid Delete ID format', 400);
    }

    const sanitizedDeleteId = sanitize(delete_id);
    if (sanitizedDeleteId !== delete_id) {
      console.warn(`Potential sanitization mismatch for ID: original='${delete_id}', sanitized='${sanitizedDeleteId}'`);
      return sendErrorResponse('Invalid characters in Delete ID', 400);
    }


    let referer = null;
    try {
      const body = await request.json(); // Only parse body if needed for referer
      if (body && body.referer) {
        referer = sanitize(body.referer.toString()); // Sanitize referer
        if (referer?.includes(process.env.NEXT_PUBLIC_WEBSITE_URL)) {
          referer = null;
        }
      }
    } catch (e) {
      console.warn("Could not parse request body for referer:", e.message);
    }


    await connectDB();
    const link = await Link.findOneAndDelete({ _id: sanitizedDeleteId }).lean();

    if (!link) {
      return sendErrorResponse('Link not found or already deleted', 404);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Link deleted successfully',
        data: { id: link._id }
      }),
      {
        status: 200,
        headers: secureHeaders,
      }
    );

  } catch (error) {
    console.error({
      message: 'Error deleting link in DELETE handler',
      errorMessage: error.message,
      stack: error.stack,
      requestId: request.headers.get('x-request-id'),
    });

    if (error instanceof SyntaxError && error.message.includes("JSON")) {
      return sendErrorResponse('Invalid JSON payload', 400);
    }

    return sendErrorResponse('Internal server error', 500);
  }
};