/* eslint-disable @next/next/no-head-element */

import Header from "./header";

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
        <Header />
        <main>{children}</main>
        <footer className="footer">Hey</footer>
      </body>
    </html>
  );
}
