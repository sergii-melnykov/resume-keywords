export function cleanWords(words: string[]): string[] {
  return words.map((word) => word.trim().replace(/[,:;!?()]/g, '').replace(/^[^a-zа-яё]+|[^a-zа-яё]+$/gi, '').toLowerCase());
}