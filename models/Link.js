import { Schema, model, models } from 'mongoose';

const LinkSchema = new Schema(
	{
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true, // faster queries per user
		},
		url: {
			type: String,
			required: [true, 'Original URL is required.'],
			trim: true,
			validate: {
				validator: (v) => {
					try {
						new URL(v);
						return true;
					} catch {
						return false;
					}
				},
				message: 'Invalid URL format.',
			},
		},
		short_url: {
			type: String,
			required: [true, 'Short URL ID is required.'],
			unique: true,
			match: [/^[a-zA-Z0-9_-]+$/, 'Short URL must be alphanumeric.'],
			maxLength: 20,
		},
		expiration: {
			type: Date,
			default: null,
		},
		neverExpires: {
			type: Boolean,
			default: false,
		},
		clicks: {
			type: Number,
			default: 0,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			immutable: true,
		},
	},
	{
		timestamps: true,
	}
);

const Link = models.Link || model('Link', LinkSchema);

export default Link;
