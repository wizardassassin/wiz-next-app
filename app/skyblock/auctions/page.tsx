import { getAuctions, AItemObj } from "utils/auctions";
import { getTranslations, TItemObj } from "utils/translations";

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
