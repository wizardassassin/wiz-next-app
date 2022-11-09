import Link from "next/link";

export default async function SkyblockPage() {
  return (
    <div>
      <h1>Skyblock Page</h1>
      <p>Some Content</p>
      <div>
        <Link href="/skyblock/bazaar">Bazaar</Link>
      </div>
      <div>
        <Link href="/skyblock/auctions">Auctions</Link>
      </div>
    </div>
  );
}
