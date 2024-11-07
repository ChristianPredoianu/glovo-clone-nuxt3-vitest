export default function useGeolocation() {
  const latitude = ref<number | null>(null);
  const longitude = ref<number | null>(null);
  const error = ref<string | null>(null);

  function getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude.value = position.coords.latitude;
          longitude.value = position.coords.longitude;
        },
        (err) => {
          error.value = err.message;
        }
      );
    } else {
      error.value = 'Geolocation is not supported by this browser.';
    }
  }

  return { latitude, longitude, error, getLocation } as const;
}
