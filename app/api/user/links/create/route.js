import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Link from '@/models/Link';
import { decrypt, generateShortCode, isValidShortCode } from '@/lib/crypto';
import sanitize from 'mongo-sanitize';
import validator from 'validator';

// Headers
const secureHeaders = {
	'Content-Type': 'application/json',
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'no-referrer',
	'Cache-Control': 'no-store',
	'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
	'X-Frame-Options': 'DENY',
	'Content-Security-Policy':
		"default-src 'none'; frame-ancestors 'none'; base-uri 'none';",
};

export const POST = async (req) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Unauthorized',
				}),
				{
					status: 401,
					headers: secureHeaders,
				}
			);
		}

		const body = await req.json();
		const url = sanitize(body.url || '').trim();
		const custom_code = sanitize(decrypt(body.custom_code) || '').trim();
		const neverExpires = body.neverExpires ?? true;
		const expiration = body.expiration ? new Date(body.expiration) : null;

		// Validate URL
		if (!url || !validator.isURL(url, { require_protocol: true })) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Invalid or missing URL',
				}),
				{
					status: 400,
					headers: secureHeaders,
				}
			);
		}

		// Validate expiration if provided
		if (!neverExpires && (!expiration || isNaN(expiration))) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Invalid expiration date',
				}),
				{
					status: 400,
					headers: secureHeaders,
				}
			);
		}

		await connectDB();

		const user = await User.findOne({ email: session.user.email })
			.select('_id linksAllowed')
			.lean();

		if (!user) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'User not found',
				}),
				{
					status: 404,
					headers: secureHeaders,
				}
			);
		}

		const totalLinks = await Link.countDocuments({ creator: user._id });

		if (user?.linksAllowed > 0 && totalLinks >= user?.linksAllowed) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Link Creation Exceeded',
				}),
				{
					status: 409,
					headers: secureHeaders,
				}
			);
		}

		let shortCode = custom_code || generateShortCode(8);

		// Check for collision
		const exists = await Link.findOne({ short_url: shortCode });
		if (exists) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Custom short URL already taken',
				}),
				{
					status: 409,
					headers: secureHeaders,
				}
			);
		}

		if (!isValidShortCode(shortCode)) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Invalid short code format',
				}),
				{
					status: 400,
					headers: secureHeaders,
				}
			);
		}

		const newLink = new Link({
			creator: user._id,
			url,
			short_url: shortCode,
			expiration: neverExpires ? null : expiration,
			neverExpires: !!neverExpires,
		});

		await newLink.save();

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Short link created successfully',
				data: {
					short_url: shortCode,
					original_url: url,
				},
			}),
			{
				status: 201,
				headers: secureHeaders,
			}
		);
	} catch (error) {
		console.error('Create link error:', error);
		return new Response(
			JSON.stringify({
				success: false,
				message: 'Something went wrong',
			}),
			{
				status: 500,
				headers: secureHeaders,
			}
		);
	}
};
