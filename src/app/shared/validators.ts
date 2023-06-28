import {AbstractControl, ValidatorFn} from "@angular/forms";

export function createEventTimeValidator(stepSize: Number): ValidatorFn {
  return function(control) {
    if (Number(control.value) === 0) {
      return {
        'validationerror': true
      };
    } else {
      return null;
    }
  };
}
