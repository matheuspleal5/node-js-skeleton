import { ConfigError } from '@/shared/config/errors'

export class EnvVariableNotProvidedError extends Error implements ConfigError {
  constructor(public readonly key: string) {
    super(`Environment variable with key "${key}" is not provided`)
  }
}
