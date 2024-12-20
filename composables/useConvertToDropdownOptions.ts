import type { IDropdownOptions } from '@/types/ui';

export function useConvertToDropdownOptions<
  T extends { place_id: number; display_name: string }
>() {
  function convertToDropdownOptions(data: T[]): IDropdownOptions[] {
    return data.map((item) => ({
      id: item.place_id,
      text: item.display_name,
    }));
  }
  return {
    convertToDropdownOptions,
  } as const;
}
