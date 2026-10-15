export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .replace(/[,'’‘ʼ`´]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
