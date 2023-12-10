import { DEFAULT_OFFSET, MAX_LIMIT } from '@/shared/constants'
import { PaginationParams } from '@/shared/types'

function resolvePage(page?: number): number {
  if (!page || page < 0) {
    return DEFAULT_OFFSET
  }
  return page
}

function resolveLimit(limit?: number): number {
  if (!limit || limit < 0 || limit > 20) {
    return MAX_LIMIT
  }
  return limit
}

export function resolvePaginationParams(
  paginationParams?: PaginationParams,
): PaginationParams {
  return {
    page: resolvePage(paginationParams?.page),
    limit: resolveLimit(paginationParams?.limit),
  }
}
