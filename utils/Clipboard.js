export async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
    return { success: true }
  } catch (err) {
    return { success: false }
  }
}
