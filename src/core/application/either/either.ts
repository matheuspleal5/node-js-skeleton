import { Left, Right } from '@/core/application/either'

export type Either<L, R> = Left<L, R> | Right<L, R>

export function left<L, R>(value: L): Either<L, R> {
  return new Left(value)
}

export function right<L, R>(value: R): Either<L, R> {
  return new Right(value)
}
