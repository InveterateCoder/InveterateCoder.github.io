/** Guards so unfilled `TODO` placeholders in src/data never render to users. */

export const isTodo = (value: string): boolean => value.includes('TODO')

/** Drop any list items that are still placeholders. */
export const cleanList = (items: readonly string[]): string[] =>
  items.filter((item) => !isTodo(item))
