/**
 * Formats standard ISO string to friendly Pakistani date representation
 * e.g. "2026-10-15" -> "15 Oct 2026"
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Returns formatted time string: "14:30" -> "02:30 PM"
 */
export function formatTime(timeString: string): string {
  try {
    if (timeString.includes('AM') || timeString.includes('PM')) {
      return timeString;
    }
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  } catch {
    return timeString;
  }
}

/**
 * Calculates remaining days until a hearing or deadline
 */
export function getDaysUntil(dateString: string): number {
  const target = new Date(dateString).getTime();
  const now = new Date().getTime();
  const diff = target - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
