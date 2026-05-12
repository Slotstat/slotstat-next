// Normalise an arbitrary string (provider / casino name) into a URL slug.
// Lowercase, ASCII-only, hyphen-separated. Stable round-trip when input is
// already a slug.
export function toSlug(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Heuristic for filtering API records that are clearly malformed / test data
// and shouldn't be exposed to crawlers. Tune as new garbage patterns appear.
export function isPublishableName(name: string | undefined | null): boolean {
  if (!name) return false;
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  // names ending in 3+ digits look like internal test rows (e.g. "Quickspin112")
  if (/\d{3,}$/.test(trimmed)) return false;
  // names that are only digits or punctuation
  if (!/[a-zA-Z]/.test(trimmed)) return false;
  return true;
}

// Find an original name from a list whose slug matches the given slug.
export function findByName<T>(
  records: T[],
  slug: string,
  getName: (r: T) => string | undefined,
): T | undefined {
  return records.find((r) => {
    const n = getName(r);
    return n ? toSlug(n) === slug : false;
  });
}
