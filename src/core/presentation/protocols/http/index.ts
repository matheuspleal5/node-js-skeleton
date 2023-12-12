import { ServerError } from '@/core/presentation/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export function ok<T = any>(data: T): HttpResponse<T> {
  return {
    statusCode: 200,
    data,
  }
}

export function badRequest(error: Error): HttpResponse<Error> {
  return {
    statusCode: 400,
    data: error,
  }
}

export function serverError(error: Error): HttpResponse<Error> {
  return {
    statusCode: 500,
    data: new ServerError(error),
  }
}
