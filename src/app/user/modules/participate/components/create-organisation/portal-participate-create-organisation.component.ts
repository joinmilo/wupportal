import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Maybe, MediaEntity } from 'src/app/core/api/generated/schema';
import { PortalParticipateActions } from '../../state/portal-participate.actions';


@Component({
  selector: 'app-portal-participate-create-organisation',
  templateUrl: './portal-participate-create-organisation.component.html',
  styleUrls: ['./portal-participate-create-organisation.component.scss']
})
export class PortalParticipateCreateOrganisationComponent {

  public descriptionForm = this.fb.group({
    name: ['' as Maybe<string>, [Validators.required]],
    description: ['' as Maybe<string>, [Validators.required]],
  });

  public contactForm = this.fb.group({
    email: ['' as Maybe<string>, [Validators.required]],
    name: ['' as Maybe<string>],
    website: ['' as Maybe<string>],
    phone: ['' as Maybe<string>],
  });

  public addressForm = this.fb.group({
    street: ['' as Maybe<string>, [Validators.required]],
    houseNumber: ['' as Maybe<string>, [Validators.required]],
    place: ['' as Maybe<string>, [Validators.required]],
    postalCode: ['' as Maybe<string>, [Validators.required]],
  });

  public titleImageForm = this.fb.group({
    titleImage: [[] as MediaEntity[], [Validators.required]],
  });

  public profileImageForm = this.fb.group({
    cardImage: [[] as MediaEntity[], [Validators.required]],
  });

  public uploadsForm = this.fb.group({
    uploads: [[] as MediaEntity[]],
  });  

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) { }

  public cancelled(): void {
    this.store.dispatch(PortalParticipateActions.cancelled());
  }

  public saved(): void {
    this.store.dispatch(PortalParticipateActions.save({
    name: this.descriptionForm.value.name,
    description: this.descriptionForm.value.description,
    contact: {
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      website: this.contactForm.value.website,
      preferredContact: false
    },
    address: {
      street: this.addressForm.value.street,
      houseNumber: this.addressForm.value.houseNumber,
      place: this.addressForm.value.place,
      postalCode: this.addressForm.value.postalCode,
    },
    slug: this.descriptionForm.value.name,
    approved: false,
    sponsored: false,
    uploads: (this.uploadsForm.value.uploads || []).map(media => ({
        media: media,
      })).concat(
        (this.profileImageForm.value.cardImage || []).map(media => ({ 
          media: media,
          card: true,
        }))
      ).concat(
        (this.titleImageForm.value.titleImage || []).map(media => ({
          media: media,
          title: true,
        }))
      ) || null,
    }));
  }
}