import type { IDropdownOptions } from '@/types/ui';

export function convertToDropdownOptions<
  T extends { place_id: number; display_name: string }
>(data: T[]): IDropdownOptions[] {
  return data.map((item) => ({
    id: item.place_id,
    text: item.display_name,
  }));
}
