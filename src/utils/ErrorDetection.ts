export class ErrorDetection {
  private static errorPatterns = new Map<string, RegExp>([
    ['network', /failed to fetch|network|etimedout|connection/i],
    ['auth', /unauthorized|forbidden|invalid token/i],
    ['validation', /validation|invalid|required/i],
    ['notFound', /not found|404|missing/i],
    ['server', /server error|500|503|504/i]
  ]);

  static categorizeError(error: unknown): string {
    const errorMessage = this.getErrorMessage(error);

    for (const [category, pattern] of this.errorPatterns) {
      if (pattern.test(errorMessage)) {
        return category;
      }
    }

    return 'unknown';
  }

  static isExpectedError(error: unknown): boolean {
    const category = this.categorizeError(error);
    return ['validation', 'notFound', 'auth'].includes(category);
  }

  private static getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }

  static enhanceError(error: unknown): Error {
    const originalError = error instanceof Error ? error : new Error(String(error));
    const category = this.categorizeError(error);
    
    return Object.assign(originalError, {
      category,
      isExpected: this.isExpectedError(error),
      timestamp: new Date().toISOString()
    });
  }
}