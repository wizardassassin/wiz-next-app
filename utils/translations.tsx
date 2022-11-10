export interface TItemObj {
  name: string;
  NPCSellPrice: number;
}

export async function getTranslations() {
  const res = await fetch("https://api.hypixel.net/resources/skyblock/items", {
    next: { revalidate: 60 * 5 },
  });
  const json = await res.json();
  const TranslationsObj: { [key: string]: TItemObj } = {};
  for (const item of json.items) {
    TranslationsObj[item.id] = {
      name: item.name,
      NPCSellPrice: item.npc_sell_price,
    };
  }
  return { lastUpdated: json.lastUpdated, TranslationsObj };
}
