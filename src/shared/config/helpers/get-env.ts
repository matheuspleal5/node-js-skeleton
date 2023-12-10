import { EnvVariableNotProvidedError } from '@/shared/config/errors'

export type TypeOfValue = boolean | number | string

export type EnvProps<T extends TypeOfValue> = {
  key: string
  defaultValue?: T
}

function hasDefaultValue(defaultValue: any): boolean {
  return !['', null, undefined].includes(defaultValue)
}

export function env<T extends TypeOfValue>({
  key,
  defaultValue,
}: EnvProps<T>): T {
  const value = process.env[key]
  if (value) {
    return value as T
  }
  if (hasDefaultValue(defaultValue)) {
    const defaultValueInStr = String(defaultValue)
    switch (typeof defaultValue) {
      case 'boolean':
        return JSON.parse(defaultValueInStr) as T
      case 'number':
        return Number(defaultValueInStr) as T
      default:
        return defaultValueInStr as T
    }
  }
  throw new EnvVariableNotProvidedError(key)
}
