export class ErrorPrevention {
  private static validationRules = new Map<string, (value: any) => boolean>();
  private static sanitizers = new Map<string, (value: any) => any>();

  static addValidationRule(name: string, rule: (value: any) => boolean): void {
    this.validationRules.set(name, rule);
  }

  static addSanitizer(name: string, sanitizer: (value: any) => any): void {
    this.sanitizers.set(name, sanitizer);
  }

  static validate(value: any, ruleName: string): boolean {
    const rule = this.validationRules.get(ruleName);
    if (!rule) {
      throw new Error(`Validation rule '${ruleName}' not found`);
    }
    return rule(value);
  }

  static sanitize(value: any, sanitizerName: string): any {
    const sanitizer = this.sanitizers.get(sanitizerName);
    if (!sanitizer) {
      throw new Error(`Sanitizer '${sanitizerName}' not found`);
    }
    return sanitizer(value);
  }

  // Common validation rules
  static {
    this.addValidationRule('required', (value) => {
      return value !== null && value !== undefined && value !== '';
    });

    this.addValidationRule('email', (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
    });

    this.addValidationRule('phone', (value) => {
      return /^\+?[\d\s-()]+$/.test(String(value));
    });

    // Common sanitizers
    this.addSanitizer('trim', (value) => String(value).trim());
    
    this.addSanitizer('number', (value) => {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    });

    this.addSanitizer('boolean', (value) => Boolean(value));
  }

  static validateObject<T extends object>(
    obj: T,
    rules: { [K in keyof T]?: string[] }
  ): { isValid: boolean; errors: { [K in keyof T]?: string } } {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    for (const [key, ruleNames] of Object.entries(rules)) {
      if (!ruleNames) continue;

      for (const ruleName of ruleNames) {
        if (!this.validate(obj[key as keyof T], ruleName)) {
          errors[key] = `Failed ${ruleName} validation`;
          isValid = false;
          break;
        }
      }
    }

    return { isValid, errors };
  }
}