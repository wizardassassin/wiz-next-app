import nbt from "prismarine-nbt";

interface AuctionObj {
  id: string;
  bid: number;
}

interface AuctionsObj {
  [key: string]: number;
}

async function getAuctions() {
  const data = await fetchAuctionData();

  return {
    lastUpdated: data.lastUpdated,
    totalPages: data.totalPages,
    auctions: Object.keys(data.data).map(
      (key) =>
        ({
          id: key,
          bid: data.data[key],
        } as AuctionObj)
    ),
  };
}

async function fetchAuctionData() {
  const initA = await fetch(`https://api.hypixel.net/skyblock/auctions`, {
    next: { revalidate: 60 * 5 },
  })
    .then((res) => res.json())
    .then((json) => ({
      lastUpdated: json.lastUpdated as number,
      totalPages: json.totalPages as number,
    }));
  const data: AuctionsObj = {};
  await Promise.all(
    Array.from({ length: initA.totalPages }, async (_, i) => {
      const json = await fetch(
        `https://api.hypixel.net/skyblock/auctions?page=${i}`,
        {
          next: { revalidate: 60 * 5 },
        }
      ).then((res) => res.json());
      const auctions = json.auctions as any[];
      auctions
        .filter((x) => x.bin)
        .forEach(async (x) => {
          const id = await getNBTData(x.item_bytes);
          data[id] ??= Infinity;
          data[id] = Math.min(data[id], x.starting_bid);
        });
    })
  );
  return { ...initA, data };
}

async function getNBTData(itemBytes: string) {
  const buffer = Buffer.from(itemBytes, "base64");
  const parsed = (await nbt.parse(buffer)).parsed;
  // @ts-ignore
  const attr1 = parsed.value.i.value.value[0].tag.value.ExtraAttributes;
  const id = attr1.value.id.value;

  if (id === "POTION") {
    const type = attr1.value.potion.value;
    const level = attr1.value.potion_level.value;
    return `${type}-${level}`;
  } else if (id === "PET") {
    const info = JSON.parse(attr1.value.petInfo.value);
    const type = info.type;
    const tier = info.tier;
    return `${type}-${tier}`;
  } else {
    return `${id}`;
  }
}

export default async function AuctionsPage() {
  const data = await getAuctions();
  const keys = Object.keys(data.auctions);
  return (
    <div>
      <h1>Auctions Page</h1>
      <p>Some Content</p>
      <div>
        {data.auctions.map((obj) => {
          return <Item2 key={obj.id} data={obj} />;
        })}
      </div>
    </div>
  );
}

function Item2({ data }: { data: AuctionObj }) {
  return (
    <details>
      <summary>{data.id}</summary>
      <p>{data.bid}</p>
    </details>
  );
}
