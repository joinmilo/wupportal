import { Maybe, OrganisationEntity, SuburbEntity } from 'src/schema/schema';

export interface SuburbOrganisation extends SuburbEntity {
  organisations: Maybe<Maybe<OrganisationEntity>[]>
}