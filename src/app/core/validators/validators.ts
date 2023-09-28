import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AppValidators {

    /**
   * 
   * CONTROL VALIDATIONS
   * 
   */

  public static decimal(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = /^-?[0-9]\d*([.,]\d+)?$/;

      if (!control.value) {
        return null;
      }

      if (!pattern.test(control.value)) {
        return { numbersOnly: true };
      }

      return null;
    };
  }

  public static digits(digits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = new RegExp(`^[0-9]{${digits}}$`);

      if (!control.value) {
        return null;
      }

      if (!pattern.test(control.value)) {
        return { digitsNotMatching: true };
      }
  
      return null;
    };
  }

  /**
   * 
   * GROUP VALIDATIONS
   * 
   */
  public static allOrNone(...fields: string[]): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const values = fields.map((fieldName) => group?.get(fieldName)?.value);
  
      const allUnset = values.every((value) => value == null || value === '');
      const allSet = values.every((value) => value != null && value !== '');
  
      return allUnset || allSet
        ? null
        : { allOrNoneFieldsRequired: true };
    };
  }

  static dateBefore(startControl: string, endControl: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const startDateControl = group?.get(startControl);
      const endDateControl = group?.get(endControl);

      const startDate = startDateControl?.value;
      const endDate = endDateControl?.value;

      return !startDate || !endDate
        ? null
        : startDate > endDate
          ? { startNotBeforeEnd: true }
          : null;
    };
  }

  public static same(...fields: string[]): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const values = fields
        .map((i) => group?.get(i)?.value);

      return values.every((i) => i === values[0])
        ? null
        : { notSame: true };
    };
  }


}