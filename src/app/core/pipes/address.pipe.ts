import { Pipe, PipeTransform } from '@angular/core';
import { AddressEntity, Maybe } from 'src/schema/schema';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  public transform(value?: Maybe<AddressEntity>): string | null | undefined {    
    return `
      ${value?.street} ${value?.houseNumber} <br>
      ${value?.postalCode} ${value?.place}
    `;
  }
}
