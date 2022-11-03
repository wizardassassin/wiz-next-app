interface AItemObj {
  productID: string;
  bin: number;
}

async function getAuctions() {
  const res = await fetch("https://moulberry.codes/lowestbin.json", {
    // cache: "no-store",
    next: { revalidate: 60 },
  });
  const json = await res.json();
  const keys = Object.keys(json);
  const auctionArr: AItemObj[] = [];
  for (const key of keys) {
    auctionArr.push({ productID: key, bin: json[key] });
  }
  return auctionArr;
}

export default async function AuctionsPage() {
  const data = await getAuctions();

  return (
    <div>
      <h1>Auctions Page</h1>
      <p>Some Content</p>
      <div>
        {data.map((obj) => {
          return <Item2 key={obj.productID} data={obj} />;
        })}
      </div>
    </div>
  );
}

function Item2({ data }: { data: AItemObj }) {
  return (
    <details>
      <summary>{data.productID}</summary>
      <p>{data.bin}</p>
    </details>
  );
}
