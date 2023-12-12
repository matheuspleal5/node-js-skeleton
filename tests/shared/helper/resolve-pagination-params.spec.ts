import { faker } from '@faker-js/faker'

import { resolvePaginationParams } from '@/shared/helpers'

describe('ResolvePaginationParams', () => {
  it('should be able to resolve pagination params when page and limit is not provided', () => {
    const { page, limit } = resolvePaginationParams()

    expect(page).toBe(1)
    expect(limit).toBe(20)
  })

  it('should be able to resolve pagination params when page is less than 1', () => {
    const fakeNonExistentPage = faker.number.int({ max: 0 })

    const { page, limit } = resolvePaginationParams({
      page: fakeNonExistentPage,
      limit: 20,
    })

    expect(page).toBe(1)
    expect(limit).toBe(20)
  })

  it('should be able to resolve pagination params when limit is less than 1', () => {
    const fakeNonExistentLimit = faker.number.int({ min: 21 })

    const { page, limit } = resolvePaginationParams({
      page: 1,
      limit: fakeNonExistentLimit,
    })

    expect(page).toBe(1)
    expect(limit).toBe(20)
  })

  it('should be able to resolve pagination params when limit is greater than 20', () => {
    const fakeBigLimit = faker.number.int({ min: 21 })

    const { page, limit } = resolvePaginationParams({
      page: 1,
      limit: fakeBigLimit,
    })

    expect(page).toBe(1)
    expect(limit).toBe(20)
  })
})
