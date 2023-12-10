import { UseCase } from '@/core/application'
import { Either, left, right } from '@/core/application/either'

class IdNotFoundError extends Error {
  constructor() {
    super()
  }
}

type FakeUseCaseInput = {
  idExists: boolean
}
type FakeUseCaseOutput = Either<
  IdNotFoundError,
  {
    idExists: boolean
  }
>

class FakeUseCase implements UseCase<FakeUseCaseInput, FakeUseCaseOutput> {
  execute({ idExists }: FakeUseCaseInput): Promise<FakeUseCaseOutput> {
    if (!idExists) {
      return Promise.resolve(left(new IdNotFoundError()))
    }
    return Promise.resolve(right({ idExists }))
  }
}

describe('UseCase', () => {
  let sut: FakeUseCase

  beforeAll(() => {
    sut = new FakeUseCase()
  })

  it('should be able to implements a UseCase interface using Either to return the result', async () => {
    {
      const result = await sut.execute({ idExists: false })
      expect(result.isLeft()).toBe(true)
      expect(result.isRight()).toBe(false)
      expect(result.value).toBeInstanceOf(IdNotFoundError)
    }
    {
      const result = await sut.execute({ idExists: true })
      expect(result.isLeft()).toBe(false)
      expect(result.isRight()).toBe(true)
      expect(result.value).toEqual({ idExists: true })
    }
  })
})
