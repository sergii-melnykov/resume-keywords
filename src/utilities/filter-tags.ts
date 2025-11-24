export function filterTags(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}