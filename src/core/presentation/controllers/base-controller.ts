import { ValidationComposite, Validator } from '@/core/presentation/validation'

export abstract class BaseController<Request, Response> {
  abstract handle(request: Request): Promise<Response>

  buildValidators(request: Request): Validator[] {
    return []
  }

  protected validate(request: Request): Error | undefined {
    const validators = this.buildValidators(request)
    return new ValidationComposite(validators).validate()
  }
}
