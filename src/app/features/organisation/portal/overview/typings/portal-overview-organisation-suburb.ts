import { Maybe, OrganisationEntity, SuburbEntity } from 'src/app/core/api/generated/schema';

export interface SuburbOrganisation extends SuburbEntity {
  organisations: Maybe<Maybe<OrganisationEntity>[]>
}