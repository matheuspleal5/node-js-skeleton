import { PresentationError } from '@/core/presentation/errors'

export class ServerError extends Error implements PresentationError {
  constructor(readonly error: Error) {
    super('Server failed.')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
