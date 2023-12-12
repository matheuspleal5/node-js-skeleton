import { Validator } from '@/core/presentation/validation'

export class ValidationBuilder {
  private constructor(
    private readonly value: any,
    private readonly fieldName?: string,
    private readonly validators: Validator[] = [],
  ) {}

  static of({
    value,
    fieldName,
  }: {
    value: any
    fieldName?: string
  }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  build(): Validator[] {
    return this.validators
  }
}
