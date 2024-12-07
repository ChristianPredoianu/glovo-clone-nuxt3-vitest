interface IItem {
  [key: string]: any;
}

interface ICallbackFunction {
  (e: Event): void;
}

export function capitalizeFirstLetter(str: string | IItem): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function handleKeyDown(e: KeyboardEvent, callback: ICallbackFunction) {
  if (e.key === 'Enter') {
    callback(e);
  }
}

export function generateRandomPrice() {
  const randomFraction = Math.random();

  const randomPrice = 10 + randomFraction * (50 - 10);

  return randomPrice.toFixed(2);
}

export function replaceRecipeText(text: string) {
  const replacedRecipeText = text.replace(/\brecipe\b|\brecipes\b/gi, '').trim();

  return replacedRecipeText;
}
