import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <div>
          <h1>
            <Link href="/">Home</Link>
          </h1>
        </div>
        <div>
          <Link href="/about">About</Link>
        </div>
        <div>
          <Link href="/skyblock">Skyblock</Link>
        </div>
        <div>
          <a
            href="https://github.com/wizardassassin/wiz-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </div>
      </nav>
    </header>
  );
}
