interface ItemObj {
  productID: string;
  sellPriceSum: number;
  buyPriceSum: number;
  sellPrice: number;
  buyPrice: number;
  sellMovingWeek: number;
  buyMovingWeek: number;
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function getBazaar() {
  const res = await fetch("https://api.hypixel.net/skyblock/bazaar", {
    // cache: "no-store",
    next: { revalidate: 60 },
  });
  await sleep(0);
  const json = await res.json();
  const bazaarArr: ItemObj[] = [];
  for (const key in json.products) {
    const quick_status = json.products[key].quick_status;
    bazaarArr.push({
      productID: key,
      sellPriceSum: json.products[key].sell_summary[0]?.pricePerUnit ?? 0,
      buyPriceSum: json.products[key].buy_summary[0]?.pricePerUnit ?? 0,
      sellPrice: quick_status.sellPrice,
      buyPrice: quick_status.buyPrice,
      sellMovingWeek: quick_status.sellMovingWeek,
      buyMovingWeek: quick_status.buyMovingWeek,
    });
  }
  return { lastUpdated: json.lastUpdated as number, bazaarArr };
}

export default async function BazaarPage() {
  const data = await getBazaar();
  return (
    <div>
      <h1>Bazaar Page</h1>
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
