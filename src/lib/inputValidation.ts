/**
 * Input validation and sanitization utilities for user-facing forms and chat
 * Provides protection against prompt injection, control character attacks, and spam
 */

export const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES_PER_SESSION = 25;
const SESSION_STORAGE_KEY = 'chat_message_count';

/**
 * Suspicious patterns that may indicate prompt injection attempts
 */
const SUSPICIOUS_PATTERNS = [
  /ignore\s+(previous|all|prior|above)\s+(instructions?|prompts?|rules?)/i,
  /disregard\s+(previous|all|prior|above)\s+(instructions?|prompts?|rules?)/i,
  /forget\s+(previous|all|prior|above)\s+(instructions?|prompts?|rules?)/i,
  /you\s+are\s+now\s+a/i,
  /act\s+as\s+(a\s+)?different/i,
  /pretend\s+(you('re|\s+are)\s+)?(a\s+)?/i,
  /system\s*:\s*/i,
  /\[\s*system\s*\]/i,
  /<\s*\|im_start\|>/i,
  /<\s*\|im_end\|>/i,
  /<\s*\|endoftext\|>/i,
  /\[INST\]/i,
  /\[\/INST\]/i,
  /<<SYS>>/i,
  /<\/SYS>/i,
  /\{\{.*system.*\}\}/i,
  /reveal\s+(your\s+)?(system\s+)?prompt/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?instructions/i,
  /what\s+(are\s+)?(your\s+)?(initial\s+)?instructions/i,
  /repeat\s+(your\s+)?(system\s+)?prompt/i,
  /output\s+(your\s+)?(system\s+)?prompt/i,
];

/**
 * Remove control characters that could corrupt data or cause display issues
 * Preserves newlines, tabs, and standard printable characters
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    // Remove NULL bytes and other dangerous control characters (keep \n \r \t)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Remove Unicode control characters and private use area
    .replace(/[\u0080-\u009F]/g, '')
    // Normalize excessive whitespace
    .replace(/\s{3,}/g, '  ')
    // Limit length
    .slice(0, MAX_MESSAGE_LENGTH);
}

/**
 * Check if input contains patterns commonly used in prompt injection attacks
 * Returns true if suspicious, false if clean
 */
export function containsSuspiciousPatterns(input: string): boolean {
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(input));
}

/**
 * Session-based rate limiting using sessionStorage
 * Returns { allowed: boolean, remaining: number, resetRequired: boolean }
 */
export function checkSessionRateLimit(): {
  allowed: boolean;
  remaining: number;
  resetRequired: boolean;
} {
  try {
    const countStr = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const count = countStr ? parseInt(countStr, 10) : 0;
    
    if (count >= MAX_MESSAGES_PER_SESSION) {
      return { allowed: false, remaining: 0, resetRequired: true };
    }
    
    return { 
      allowed: true, 
      remaining: MAX_MESSAGES_PER_SESSION - count - 1,
      resetRequired: false 
    };
  } catch {
    // sessionStorage not available, allow the message
    return { allowed: true, remaining: MAX_MESSAGES_PER_SESSION, resetRequired: false };
  }
}

/**
 * Increment the session message counter
 */
export function incrementSessionMessageCount(): void {
  try {
    const countStr = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const count = countStr ? parseInt(countStr, 10) : 0;
    sessionStorage.setItem(SESSION_STORAGE_KEY, (count + 1).toString());
  } catch {
    // sessionStorage not available, ignore
  }
}

/**
 * Reset the session message counter (for new conversations)
 */
export function resetSessionMessageCount(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // sessionStorage not available, ignore
  }
}

/**
 * Comprehensive input validation result
 */
export interface ValidationResult {
  isValid: boolean;
  sanitizedInput: string;
  errorMessage?: string;
  isSuspicious: boolean;
  rateLimitInfo: {
    allowed: boolean;
    remaining: number;
  };
}

/**
 * Main validation function - combines all checks
 */
export function validateUserInput(input: string): ValidationResult {
  // Check rate limit first
  const rateLimitInfo = checkSessionRateLimit();
  if (!rateLimitInfo.allowed) {
    return {
      isValid: false,
      sanitizedInput: '',
      errorMessage: "You've reached the message limit for this session. Please try again later or reach out on WhatsApp.",
      isSuspicious: false,
      rateLimitInfo: { allowed: false, remaining: 0 },
    };
  }

  // Sanitize input
  const sanitizedInput = sanitizeInput(input);

  // Check for empty after sanitization
  if (!sanitizedInput) {
    return {
      isValid: false,
      sanitizedInput: '',
      errorMessage: 'Please enter a message.',
      isSuspicious: false,
      rateLimitInfo,
    };
  }

  // Check for excessive length (after sanitization, but warn about original)
  if (input.length > MAX_MESSAGE_LENGTH) {
    return {
      isValid: false,
      sanitizedInput,
      errorMessage: 'That message is a bit too long. Could you keep it shorter?',
      isSuspicious: false,
      rateLimitInfo,
    };
  }

  // Check for suspicious patterns (potential prompt injection)
  const isSuspicious = containsSuspiciousPatterns(sanitizedInput);
  
  // We still allow the message but flag it - actual blocking can be done server-side
  // This allows legitimate users who accidentally trigger patterns to continue
  
  return {
    isValid: true,
    sanitizedInput,
    isSuspicious,
    rateLimitInfo,
  };
}
