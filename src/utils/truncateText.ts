export function truncateText(
  text: string | undefined | null,
  length: number,
): string {
  if (!text) return 'N/A';

  const truncatedString =
    text.length > length ? `${text.substr(0, length - 1)}...` : text;

  return truncatedString;
}
