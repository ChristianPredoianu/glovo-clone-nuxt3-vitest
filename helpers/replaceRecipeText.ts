export function replaceRecipeText(text: string) {
  const replacedRecipeText = text.replace(/\brecipe\b|\brecipes\b/gi, '').trim();

  return replacedRecipeText;
}
