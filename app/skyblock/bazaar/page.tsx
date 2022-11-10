import { getBazaar, BItemObj } from "utils/bazaar";
import { getTranslations, TItemObj } from "utils/translations";
import { toTitleCase } from "utils/utils";

import style from "./bazaar.module.css";

export default async function BazaarPage() {
  const dataP = getBazaar();
  const translationsP = getTranslations();

  const data = await dataP;
  const translations = await translationsP;

  return (
    <div>
      <h1 className={style.h1}>Bazaar Page</h1>
      <p>Some Content</p>
      <div className={style.BazaarItemContainer}>
        {data.bazaarArr.map((item) => {
          return (
            <Item
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

function getName(id: string, name: string | undefined) {
  let displayName = name;
  if (id.startsWith("ENCHANTMENT_")) {
    const tmpArr = id.split("_");
    const num = tmpArr.pop();
    displayName = tmpArr.map((x) => toTitleCase(x)).join(" ") + " " + num;
  }
  if (id.startsWith("ESSENCE_")) {
    displayName = id
      .split("_")
      .reverse()
      .map((x) => toTitleCase(x))
      .join(" ");
  }
  if (id === "BAZAAR_COOKIE") {
    displayName = "Bazaar Cookie";
  }
  displayName ??= id;
  if (displayName.startsWith("§")) {
    displayName = displayName.slice(2);
  }
  if (displayName === id) {
    console.log(id);
  }
  return displayName;
}

function Item({ data, name }: { data: BItemObj; name: TItemObj | undefined }) {
  let displayName = getName(data.productID, name?.name);
  return (
    <div className={style.BazaarItem}>
      <h4>{displayName}</h4>
      <p>
        Buy Price: {data.buyPriceSum}
        <br />
        Sell Price: {data.sellPriceSum}
        <br />
        Instant Buys: {data.buyMovingWeek}
        <br />
        Instant Sells: {data.sellMovingWeek}
      </p>
    </div>
  );
}
