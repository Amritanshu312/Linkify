export const options = [
	'Never',
	'1 Hours',
	'6 Hours',
	'2 week',
	'1 Month',
	'6 Month',
	'1 year',
	// "custom",
];

export function convertToISOString(expiration, baseDate = new Date()) {
	const trimmed = expiration.trim();
	const lower = trimmed.toLowerCase();

	if (lower === 'never') return 'Never';

	const unitMap = {
		hour: 'hour',
		hours: 'hour',
		hr: 'hour',
		hrs: 'hour',
		week: 'week',
		weeks: 'week',
		month: 'month',
		months: 'month',
		year: 'year',
		years: 'year',
	};

	const parts = lower.split(' ');
	if (parts.length !== 2) return 'Invalid';

	const [amountStr, rawUnit] = parts;
	const amount = parseInt(amountStr, 10);
	if (isNaN(amount)) return 'Invalid';

	const unit = unitMap[rawUnit];
	if (!unit) return 'Invalid';

	const date = new Date(baseDate);

	switch (unit) {
		case 'hour':
			date.setHours(date.getHours() + amount);
			break;
		case 'week':
			date.setDate(date.getDate() + amount * 7);
			break;
		case 'month':
			date.setMonth(date.getMonth() + amount);
			break;
		case 'year':
			date.setFullYear(date.getFullYear() + amount);
			break;
	}

	return isNaN(date.getTime()) ? 'Invalid' : date.toISOString();
}

export function formatDate(isoString) {
	const date = new Date(isoString);
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	return date.toLocaleDateString('en-US', options);
}
