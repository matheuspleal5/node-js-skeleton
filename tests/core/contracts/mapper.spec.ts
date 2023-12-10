import { Mapper } from '@/core/contracts'

import {
  FakeDTO,
  FakeDomain,
  FakeEntity,
  makeFakeDTOStub,
  makeFakeDomainStub,
  makeFakeEntityStub,
} from '#/core/contracts/@mocks/fake-map-stub'

class FakeMap extends Mapper<FakeDTO, FakeDomain, FakeEntity> {
  private static instance: FakeMap

  private constructor() {
    super()
  }

  public static getInstance(): FakeMap {
    if (!FakeMap.instance) {
      FakeMap.instance = new FakeMap()
    }

    return FakeMap.instance
  }

  toDTO(domain: FakeDomain): FakeDTO {
    return {
      email: domain.email,
      name: domain.name,
      age: new Date().getFullYear() - domain.birthdate.getFullYear(),
    }
  }

  toCollectionDTO(domains: FakeDomain[]): FakeDTO[] {
    return domains.map<FakeDTO>(this.toDTO)
  }

  toDomain(entity: FakeEntity): FakeDomain {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.full_name,
      birthdate: entity.birthdate,
    }
  }

  toCollectionDomain(entities: FakeEntity[]): FakeDomain[] {
    return entities.map<FakeDomain>(this.toDomain)
  }

  toPersistence(domain: FakeDomain): FakeEntity {
    return {
      id: domain.id,
      email: domain.email,
      full_name: domain.name,
      birthdate: domain.birthdate,
    }
  }

  toCollectionPersistence(domains: FakeDomain[]): FakeEntity[] {
    return domains.map<FakeEntity>(this.toPersistence)
  }
}

describe('Mapper', () => {
  let sut: FakeMap
  let fakeDTO: FakeDTO
  let fakeDomain: FakeDomain
  let fakeEntity: FakeEntity

  beforeAll(() => {
    sut = FakeMap.getInstance()
    fakeDTO = makeFakeDTOStub()
    fakeDomain = makeFakeDomainStub()
    fakeEntity = makeFakeEntityStub()
  })

  it('should be able to convert Domain to DTO', () => {
    const domainToDTO = sut.toDTO(fakeDomain)

    expect(domainToDTO).toMatchObject(fakeDTO)
  })

  it('should be able to convert collection Domain to collection DTO', () => {
    const domainToDTO = sut.toCollectionDTO([fakeDomain])

    expect(domainToDTO).toMatchObject([fakeDTO])
  })

  it('should be able to convert Entity to Domain', () => {
    const entityToDomain = sut.toDomain(fakeEntity)

    expect(entityToDomain).toMatchObject(fakeDomain)
  })

  it('should be able to convert collection Entity to collection Domain', () => {
    const entityToDomain = sut.toCollectionDomain([fakeEntity])

    expect(entityToDomain).toMatchObject([fakeDomain])
  })

  it('should be able to convert Domain to Entity', () => {
    const domainToEntity = sut.toPersistence(fakeDomain)

    expect(domainToEntity).toMatchObject(fakeEntity)
  })

  it('should be able to convert collection Domain to collection Entity', () => {
    const domainToEntity = sut.toCollectionPersistence([fakeDomain])

    expect(domainToEntity).toMatchObject([fakeEntity])
  })
})
