export function hasEmptyFields(obj: Record<string, any>): boolean {
  return Object.values(obj).some((value) => value.trim() === '');
}
