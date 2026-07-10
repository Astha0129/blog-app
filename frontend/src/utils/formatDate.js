/**
 * Formats a date string into human-readable forms.
 */

/**
 * Returns "Jan 5, 2025" format
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Returns relative time e.g. "3 days ago", "just now"
 */
export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr  = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr  / 24);
  const diffMon = Math.floor(diffDay / 30);
  const diffYr  = Math.floor(diffMon / 12);

  if (diffSec < 60)   return 'just now';
  if (diffMin < 60)   return `${diffMin} min ago`;
  if (diffHr  < 24)   return `${diffHr} hr ago`;
  if (diffDay < 30)   return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffMon < 12)   return `${diffMon} month${diffMon > 1 ? 's' : ''} ago`;
  return `${diffYr} year${diffYr > 1 ? 's' : ''} ago`;
}

/**
 * Returns "January 2025" format
 */
export function formatMonthYear(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

export default formatDate;
