import { faker } from '@faker-js/faker'

export type FakeDTO = {
  email: string
  name: string
  age: number
}

export type FakeDomain = {
  id: string
  email: string
  name: string
  birthdate: Date
}

export type FakeEntity = {
  id: string
  email: string
  full_name: string
  birthdate: Date
}

const id = faker.string.uuid()
const email = faker.internet.email()
const name = faker.person.fullName()
const birthdate = faker.date.birthdate({ min: 1950, max: 2005 })
const age = new Date().getFullYear() - birthdate.getFullYear()

export function makeFakeDTOStub(): FakeDTO {
  return {
    email,
    name,
    age,
  }
}

export function makeFakeDomainStub(): FakeDomain {
  return {
    id,
    email,
    name,
    birthdate,
  }
}

export function makeFakeEntityStub(): FakeEntity {
  return {
    id,
    email,
    full_name: name,
    birthdate,
  }
}
