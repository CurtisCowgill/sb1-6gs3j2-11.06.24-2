export class ErrorRecovery {
  private static retryCount = new Map<string, number>();
  private static MAX_RETRIES = 3;
  private static BACKOFF_DELAY = 1000; // Base delay in milliseconds

  static async handleError(error: unknown, operation: () => Promise<any>, operationId: string): Promise<any> {
    const retries = this.retryCount.get(operationId) || 0;

    if (retries >= this.MAX_RETRIES) {
      this.retryCount.delete(operationId);
      throw error;
    }

    if (this.isRecoverable(error)) {
      this.retryCount.set(operationId, retries + 1);
      const delay = this.calculateBackoff(retries);
      await this.delay(delay);
      return operation();
    }

    throw error;
  }

  private static isRecoverable(error: unknown): boolean {
    if (this.isHttpError(error)) {
      const status = this.getHttpStatus(error);
      return status ? [408, 429, 500, 502, 503, 504].includes(status) : true;
    }
    
    if (error instanceof Error) {
      // Retry on network-related errors
      return /network|timeout|connection/i.test(error.message);
    }

    return false;
  }

  private static isHttpError(error: unknown): boolean {
    return (
      error instanceof Error &&
      'status' in error &&
      typeof (error as any).status === 'number'
    );
  }

  private static getHttpStatus(error: unknown): number | null {
    if (this.isHttpError(error)) {
      return (error as any).status;
    }
    return null;
  }

  private static calculateBackoff(retryCount: number): number {
    return Math.min(this.BACKOFF_DELAY * Math.pow(2, retryCount), 10000);
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static resetRetries(operationId: string): void {
    this.retryCount.delete(operationId);
  }
}