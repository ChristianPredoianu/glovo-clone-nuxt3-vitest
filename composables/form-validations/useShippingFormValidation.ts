import { ref } from 'vue';
import { capitalizeFirstLetter } from '@/helpers/helpers';

// Define valid field names as a type
type AddressField = 'streetAndHouseNumber' | 'zipCode' | 'city' | 'country';

export default function useShippingFormValidation() {
  const errors = ref({
    streetAndHouseNumber: '',
    zipCode: '',
    city: '',
    country: '',
  });

  // Helper function to reset error state for all fields
  function clearErrors() {
    errors.value = {
      streetAndHouseNumber: '',
      zipCode: '',
      city: '',
      country: '',
    };
  }

  function validateStreetAndHouseNumber(value: string | undefined) {
    errors.value.streetAndHouseNumber = '';

    if (!value || value.trim() === '') {
      errors.value.streetAndHouseNumber = 'Street and house number is required.';
      return false;
    }

    const trimmedValue = value.trim();

    const regex = /^[a-zA-Z\s]+ \d+$/;

    if (!regex.test(trimmedValue)) {
      errors.value.streetAndHouseNumber =
        'Invalid format. Please use the format "Street 2".';
      return false;
    }

    return true;
  }

  function validateEuropeanZipCode(value: string | undefined) {
    errors.value.zipCode = '';

    if (!value || value.trim() === '') {
      errors.value.zipCode = 'Zip code is required.';
      return false;
    }

    const trimmedValue = value.trim();

    const europeanZipCodeRegex = /^[A-Z0-9]{3,4}(\s?[A-Z0-9]{2,4})?$/i;

    if (!europeanZipCodeRegex.test(trimmedValue)) {
      errors.value.zipCode = 'Invalid zip code. Please enter a valid European zip code.';
      return false;
    }

    return true;
  }

  function validateCityOrCountry(value: string | undefined, fieldName: AddressField) {
    // Reset the specific field's error
    errors.value[fieldName] = '';

    if (!value || value.trim() === '') {
      errors.value[fieldName] = `${capitalizeFirstLetter(fieldName)} is required.`;
      return false;
    }

    const trimmedValue = value.trim();

    const regex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

    if (!regex.test(trimmedValue)) {
      errors.value[
        fieldName
      ] = `${fieldName} is invalid. Only letters, spaces, apostrophes, hyphens, and accents are allowed.`;
      return false;
    }

    return true;
  }

  // Validate all fields at once
  function validateAllFields(address) {
    clearErrors(); // Clear previous errors

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
