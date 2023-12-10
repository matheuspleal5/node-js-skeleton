import { PaginationParams } from '@/shared/types'

export function resolveOffsetByPageAndLimit({ page, limit }: PaginationParams) {
  return (page - 1) * limit
}
