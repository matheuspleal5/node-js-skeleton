export abstract class Mapper<DTO, Domain, Entity> {
  protected constructor() {}
  abstract toDTO(domain: Domain): DTO
  abstract toCollectionDTO(domains: Domain[]): DTO[]
  abstract toDomain(entity: Entity): Domain
  abstract toCollectionDomain(entities: Entity[]): Domain[]
  abstract toPersistence(domain: Domain): Entity
  abstract toCollectionPersistence(domains: Domain[]): Entity[]
}
