import { capitalizeFirstLetter } from '@/composables/helpers/capitalizeFirstLetter';
import type { IShippingAddress } from '@/types/locations';

type AddressField = 'streetAndHouseNumber' | 'zipCode' | 'city' | 'country';

export default function useShippingFormValidation() {
  const errors = reactive({
    streetAndHouseNumber: '',
    zipCode: '',
    city: '',
    country: '',
  });

  function clearErrors() {
    errors.streetAndHouseNumber = '';
    errors.zipCode = '';
    errors.city = '';
    errors.country = '';
  }

  function validateStreetAndHouseNumber(value: string | undefined) {
    errors.streetAndHouseNumber = '';

    if (!value || value.trim() === '') {
      errors.streetAndHouseNumber = 'Street and house number is required.';
      return false;
    }

    const trimmedValue = value.trim();

    // allow letters (including accented ones), spaces, and a number at the end
    const regex = /^[\p{L}\s]+ \d+$/u;

    if (!regex.test(trimmedValue)) {
      errors.streetAndHouseNumber = 'Invalid format. Please use the format "Street 2".';
      return false;
    }

    return true;
  }

  function validateEuropeanZipCode(value: string | undefined) {
    errors.zipCode = '';

    if (!value || value.trim() === '') {
      errors.zipCode = 'Zip code is required.';
      return false;
    }

    const trimmedValue = value.trim();

    const europeanZipCodeRegex = /^[A-Z0-9]{3,4}(\s?[A-Z0-9]{2,4})?$/i;

    if (!europeanZipCodeRegex.test(trimmedValue)) {
      errors.zipCode = 'Invalid zip code. Please enter a valid European zip code.';
      return false;
    }

    return true;
  }

  function validateCityOrCountry(value: string | undefined, fieldName: AddressField) {
    errors[fieldName] = '';

    if (!value || value.trim() === '') {
      errors[fieldName] = `${capitalizeFirstLetter(fieldName)} is required.`;
      return false;
    }

    const trimmedValue = value.trim();

    const regex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

    if (!regex.test(trimmedValue)) {
      errors[
        fieldName
      ] = `${fieldName} is invalid. Only letters, spaces, apostrophes, hyphens, and accents are allowed.`;
      return false;
    }

    return true;
  }

  function validateAllFields(address: IShippingAddress) {
    clearErrors();

    const isStreetValid = validateStreetAndHouseNumber(address.streetAndHouseNumber);
    const isZipValid = validateEuropeanZipCode(address.zipCode);
    const isCityValid = validateCityOrCountry(address.city, 'city');
    const isCountryValid = validateCityOrCountry(address.country, 'country');

    return isStreetValid && isZipValid && isCityValid && isCountryValid;
  }

  return {
    validateStreetAndHouseNumber,
    validateEuropeanZipCode,
    validateCityOrCountry,
    validateAllFields,
    errors,
  } as const;
}
