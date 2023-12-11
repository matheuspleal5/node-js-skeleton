import {
  EnvVariableNotProvidedError,
  FailedToConvertEnvVariableError,
} from '@/shared/config/errors'
import { env } from '@/shared/config/helpers'
import { EnvVariableEnum } from '@/shared/config/types'

describe('env', () => {
  it('should be able to get an env string variable', () => {
    const nodeEnv = env<string>({
      key: 'NODE_ENV',
      type: EnvVariableEnum.STRING,
    })

    expect(nodeEnv).toBe('test')
  })

  it('should be able to get an env string variable that was not provided but that contains a default value', () => {
    const defaultEnv = env<string>({
      key: 'DEFAULT_ENV',
      defaultValue: 'default',
    })

    expect(defaultEnv).toBe('default')
  })

  it('should be able to get an env number variable that was not provided but that contains a default value', () => {
    const numberEnv = env<number>({
      key: 'NUMBER_ENV',
      defaultValue: 3000,
    })

    expect(numberEnv).toBe(3000)
  })

  it('should be able to get an env boolean variable that was not provided but that contains a default value', () => {
    const booleanEnv = env<boolean>({
      key: 'BOOLEAN_ENV',
      defaultValue: true,
    })

    expect(booleanEnv).toBe(true)
  })

  it('should be able to throw EnvNotProvidedError when an env variable is not provided and has no default value', () => {
    expect(() => {
      env<string>({
        key: 'NOT_PROVIDED_ENV',
        type: EnvVariableEnum.STRING,
      })
    }).toThrowError(EnvVariableNotProvidedError)
  })

  it('should be able to throw FailedToConvertEnvVariable when an env variable conversion is failed', () => {
    process.env.NOT_A_BOOLEAN = 'NOT_A_BOOLEAN'

    expect(() => {
      env<boolean>({
        key: 'NOT_A_BOOLEAN',
        type: EnvVariableEnum.BOOLEAN,
      })
    }).toThrowError(FailedToConvertEnvVariableError)
  })
})
