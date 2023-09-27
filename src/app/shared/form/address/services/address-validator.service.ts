import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VerifyAddressGQL } from 'src/app/account/api/generated/account-verify-address.mutation.generated';
import { AddressEntity, Maybe } from 'src/app/core/api/generated/schema';

@Injectable()
export class AddressValidationService { 

  constructor(
    private verifyAddressService: VerifyAddressGQL,
  ) { }

  public verify(address: Partial<{
    street: Maybe<string>;
    place: Maybe<string>;
    houseNumber: Maybe<string>;
    suburb: Maybe<string>;
    }>
  ): Observable<AddressEntity> {
    return this.verifyAddressService.mutate({
      entity: {
        street: address?.street,
        houseNumber: address?.houseNumber,
        place: address.place,
      }
    }).pipe(
      map(response => response.data?.verifyAddress as AddressEntity)
    );
  }

}