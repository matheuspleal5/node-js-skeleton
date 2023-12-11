import {
  EnvVariableNotProvidedError,
  FailedToConvertEnvVariableError,
} from '@/shared/config/errors'
import { EnvVariableEnum } from '@/shared/config/types'

export type TypeOfValue = boolean | number | string

export type EnvProps<T extends TypeOfValue> =
  | {
      key: string
      type: T extends boolean
        ? EnvVariableEnum.BOOLEAN
        : T extends number
          ? EnvVariableEnum.NUMBER
          : EnvVariableEnum.STRING
      defaultValue?: T
    }
  | {
      key: string
      type?: T extends boolean
        ? EnvVariableEnum.BOOLEAN
        : T extends number
          ? EnvVariableEnum.NUMBER
          : EnvVariableEnum.STRING
      defaultValue: T
    }

function hasDefaultValue(defaultValue: any): boolean {
  return !['', null, undefined].includes(defaultValue)
}

export function env<T extends TypeOfValue>({
  key,
  type,
  defaultValue,
}: EnvProps<T>): T {
  const value = process.env[key] ?? defaultValue
  const typeOfValue = type ?? String(typeof defaultValue)
  if (!hasDefaultValue(value)) {
    throw new EnvVariableNotProvidedError(key, typeOfValue)
  }
  const valueInStr = String(value)
  try {
    switch (typeOfValue) {
      case EnvVariableEnum.BOOLEAN:
        return JSON.parse(valueInStr) as T
      case EnvVariableEnum.NUMBER:
        return Number(valueInStr) as T
      default:
        return valueInStr as T
    }
  } catch (err) {
    throw new FailedToConvertEnvVariableError(key, typeOfValue)
  }
}
