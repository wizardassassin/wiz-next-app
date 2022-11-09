import style from "./bazaar.module.css";

import { getBazaar, ItemObj } from "utils/bazaar";

export default async function BazaarPage() {
  const data = await getBazaar();
  return (
    <div>
      <h1 className={style.h1}>Bazaar Page</h1>
      <p>Some Content</p>
      <div>
        {data.bazaarArr.map((item) => {
          return <Item key={item.productID} data={item} />;
        })}
      </div>
    </div>
  );
}

function Item({ data }: { data: ItemObj }) {
  return (
    <details>
      <summary>{data.productID}</summary>
      <p>{data.sellMovingWeek}</p>
    </details>
  );
}
