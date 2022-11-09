export interface AItemObj {
  productID: string;
  bin: number;
}

export async function getAuctions() {
  const res = await fetch("https://moulberry.codes/lowestbin.json", {
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
