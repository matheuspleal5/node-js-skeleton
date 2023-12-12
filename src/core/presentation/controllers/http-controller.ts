import { BaseController } from '@/core/presentation/controllers'
import {
  badRequest,
  serverError,
  HttpResponse,
} from '@/core/presentation/protocols/http'

export abstract class HttpController<HttpRequest> extends BaseController<
  HttpRequest,
  HttpResponse
> {
  abstract perform(request: HttpRequest): Promise<HttpResponse>

  override async handle(request: HttpRequest): Promise<HttpResponse> {
    const error = this.validate(request)
    if (error !== undefined) {
      return badRequest(error)
    }
    try {
      return await this.perform(request)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
