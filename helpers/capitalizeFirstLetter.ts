interface IItem {
  [key: string]: any;
}

export function capitalizeFirstLetter(str: string | IItem): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
