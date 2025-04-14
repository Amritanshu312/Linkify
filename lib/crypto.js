import crypto from 'crypto';

export function encrypt(value) {
	const passphrase = process.env.NEXTAUTH_SECRET;
	if (!value || !passphrase) {
		throw new Error('Both value and passphrase must be defined and non-empty.');
	}

	const salt = crypto.randomBytes(16); // Random salt for PBKDF2
	const iv = crypto.randomBytes(16); // Initialization vector
	const key = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, 'sha256'); // PBKDF2 to derive the key

	// Create cipher with AES-256-CBC
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

	let encrypted = cipher.update(value, 'utf8', 'hex');
	encrypted += cipher.final('hex');

	// Create HMAC for integrity verification
	const hmac = crypto.createHmac('sha256', key);
	hmac.update(encrypted);
	const mac = hmac.digest('hex');

	// Combine all data (salt, iv, encrypted value, mac) into a single string
	const encryptedData = [
		salt.toString('hex'),
		iv.toString('hex'),
		encrypted,
		mac,
	].join(':'); // Separate them with a colon for easy extraction

	return encryptedData;
}

// Function to decrypt a value
export function decrypt(encryptedData) {
	const passphrase = process.env.NEXTAUTH_SECRET;
	if (!encryptedData || !passphrase) {
		throw new Error(
			'Both encryptedData and passphrase must be defined and non-empty.'
		);
	}

	// Extract the salt, iv, encrypted value, and mac from the encrypted data string
	const [saltHex, ivHex, encryptedValue, mac] = encryptedData.split(':');

	if (!saltHex || !ivHex || !encryptedValue || !mac) {
		throw new Error('Missing required encrypted data.');
	}

	const salt = Buffer.from(saltHex, 'hex');
	const iv = Buffer.from(ivHex, 'hex');

	// Recreate the key using PBKDF2 with the provided passphrase and salt
	const key = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, 'sha256');

	// Verify HMAC to ensure data integrity
	const hmac = crypto.createHmac('sha256', key);
	hmac.update(encryptedValue);
	const computedMac = hmac.digest('hex');

	if (computedMac !== mac) {
		throw new Error(
			'Data integrity check failed! The data may have been tampered with.'
		);
	}

	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
	let decrypted = decipher.update(encryptedValue, 'hex', 'utf8');
	decrypted += decipher.final('utf8');

	return decrypted;
}

export function generateShortCode(length = 10) {
	const characters =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const bytes = crypto.randomBytes(length);
	let shortCode = '';

	for (let i = 0; i < length; i++) {
		shortCode += characters[bytes[i] % characters.length];
	}

	return shortCode;
}

export function isValidShortCode(shortCode, length = 10) {
	const shortCodePattern = new RegExp(`^[a-zA-Z0-9]{${length}}$`);
	return shortCodePattern.test(shortCode);
}
