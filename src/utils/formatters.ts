/**
 * Formats a number into Pakistani Rupee representation (e.g. PKR 15,000)
 */
export function formatPKR(amount: number): string {
  return `PKR ${new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

/**
 * Formats bytes to human-readable file sizes (e.g. "2.4 MB")
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Masks a Pakistani CNIC number for privacy: "35201-1234567-1" -> "35201-*******-1"
 */
export function maskCNIC(cnic?: string): string {
  if (!cnic) return '•••••-•••••••-•';
  const clean = cnic.replace(/[^0-9]/g, '');
  if (clean.length !== 13) return cnic;
  return `${clean.slice(0, 5)}-*******-${clean.slice(12)}`;
}

/**
 * Formats Pakistani phone number: "03001234567" -> "+92 300 1234567"
 */
export function formatPakPhone(phone: string): string {
  const clean = phone.replace(/[^0-9+]/g, '');
  if (clean.startsWith('03') && clean.length === 11) {
    return `+92 ${clean.slice(1, 4)} ${clean.slice(4)}`;
  }
  if (clean.startsWith('+92') && clean.length === 13) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }
  return phone;
}
