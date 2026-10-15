export function stripHtml(html: string | null | undefined): string {
  return (
    html
      ?.replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() ?? ''
  );
}
