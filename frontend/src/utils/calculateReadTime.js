/**
 * Calculates estimated reading time for blog content.
 * @param {string} content - The post body text
 * @param {number} wpm - Words per minute (default 200)
 * @returns {string} e.g. "3 min read"
 */
export function calculateReadTime(content = '', wpm = 200) {
  if (!content) return '1 min read';
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wpm));
  return `${minutes} min read`;
}

export default calculateReadTime;
