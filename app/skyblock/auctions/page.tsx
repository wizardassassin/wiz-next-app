import { getAuctions, AItemObj } from "utils/auctions";
import { getTranslations, TItemObj } from "utils/translations";
import { toTitleCase } from "utils/utils";

export default async function AuctionsPage() {
  const dataP = getAuctions();
  const translationsP = getTranslations();

  const data = await dataP;
  const translations = await translationsP;

  return (
    <div>
      <h1>Auctions Page</h1>
      <p>Some Content</p>
      <div>
        {data.auctionArr.map((item) => {
          return (
            <Item2
              key={item.productID}
              data={item}
              name={translations.TranslationsObj?.[item.productID]}
            />
          );
        })}
      </div>
    </div>
  );
}

function Item2({ data, name }: { data: AItemObj; name: TItemObj | undefined }) {
  let displayName = name?.name;
  const key = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"];
  if (data.productID.includes(";")) {
    const tmpArr2 = data.productID.split(";");
    const num = tmpArr2[1];
    const tmpArr = tmpArr2[0].split("_");
    const rarity = num ? " - " + (key[Number(num)] ?? num) : "";
    displayName = tmpArr.map((x) => toTitleCase(x)).join(" ") + rarity;
  } else if (!displayName) {
    // Hotfix for now
    const tmpArr1 = data.productID.split("-");
    const num = tmpArr1[1];
    const tmpArr2 = tmpArr1[0].split("_");
    const rarity = num ? " - " + (key[Number(num)] ?? num) : "";
    displayName = tmpArr2.map((x) => toTitleCase(x)).join(" ") + rarity;
  }
  displayName ??= data.productID;
  if (displayName === data.productID) {
    console.log(data.productID);
  }
  return (
    <details>
      <summary>{displayName}</summary>
      <p>{data.bin}</p>
    </details>
  );
}
