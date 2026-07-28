import xss from 'xss';

/**
 * Strips HTML tags from user-generated text to prevent XSS.
 * Used by mappers before returning text fields in API responses.
 */
export const sanitizeText = (input: string): string => {
  return xss(input, {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style'],
  });
};

/**
 * Sanitizes all string fields in an object (shallow).
 */
export const sanitizeObject = <T extends Record<string, unknown>>(obj: T): T => {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeText(sanitized[key] as string);
    }
  }
  return sanitized;
};
