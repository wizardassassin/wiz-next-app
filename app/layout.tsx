/* eslint-disable @next/next/no-head-element */

import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
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
        <main>{children}</main>
        <footer className="footer">Hey</footer>
      </body>
    </html>
  );
}
