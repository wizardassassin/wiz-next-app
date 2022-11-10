export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const toTitleCase = (word: string) =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();
