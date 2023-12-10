import { Left } from '@/core/application/either'

export class Right<L, R> {
  constructor(public readonly value: R) {}

  isLeft(): this is Left<L, R> {
    return false
  }

  isRight(): this is Right<L, R> {
    return true
  }
}
