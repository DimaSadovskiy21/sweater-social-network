export const TRAILING_SPACES_REGEX = /\s\s+/g;

export const trimAllExtraSpaces = (
  value: string,
  regex = TRAILING_SPACES_REGEX
): string => value.trim().replace(regex, ' ');
