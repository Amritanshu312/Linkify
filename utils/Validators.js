export function isValidURL(url) {
  try {
    const parsed = new URL(url);

    // Only allow http or https
    if (!["http:", "https:"].includes(parsed.protocol)) return false;

    const hostname = parsed.hostname;

    // Must contain at least one dot and not end with a dot
    if (!hostname.includes(".") || hostname.endsWith(".")) return false;

    const parts = hostname.split(".");
    if (parts.some(part => part.length === 0)) return false;

    // Domain and TLD checks
    const domain = parts[parts.length - 2];
    const tld = parts[parts.length - 1];

    if (domain.length < 2 || tld.length < 2) return false;

    // No invalid characters (only a-z, 0-9, hyphens)
    const hostnameRegex = /^[a-zA-Z0-9.-]+$/;
    if (!hostnameRegex.test(hostname)) return false;

    return true;
  } catch {
    return false;
  }
}
