import { getAuctions, AItemObj } from "utils/auctions";

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
