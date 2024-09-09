/**
 * Decode HTML entities in a given text
 * @param {string} text Text with HTML entities to decode
 * @returns {string} Text with decoded HTML entities
 */
export const decodeHtmlEntities = (text: string): string => {
  const doc = new DOMParser().parseFromString(text, "text/html")
  return doc.documentElement.textContent || ""
}

/**
 * Shuffles the given array of strings
 * @param {string[]} options Array of strings to shuffle
 * @returns {string[]} Shuffled array of strings
 */
export const shuffleOptions = (options: string[]): string[] => {
  return options.sort(() => Math.random() - 0.5)
}


