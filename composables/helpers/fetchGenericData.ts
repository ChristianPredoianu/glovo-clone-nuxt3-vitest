export interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
}

export async function fetchData<T>(url: string): Promise<FetchResult<T>> {
  let isLoading = true;
  let data: T | null = null;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading = false;
  }

  return { data, isLoading };
}
