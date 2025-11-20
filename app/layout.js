// app/layout.js

import './globals.css';
import NextAuthProvider from './providers'
// import { notFound } from 'next/navigation';

export const metadata = {
  title: {
    default: "SEAP | Clean Energy for Every Community",
    template: "%s | SEAP",
  },
  description:
    "Sustainable Energy Access Project (SEAP) delivers clean, affordable energy and digital access across Nigeria.",
  metadataBase: new URL("https://seap.com.ng"),
  openGraph: {
    type: "website",
    siteName: "seap",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      //  { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  },
  //manifest: '/site.webmanifest', // You'd need to create this file
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  // This layout will wrap both your `(site)` and `dashboard` route groups.
  // It will also wrap the `not-found.js` page.
  // Therefore, it should NOT contain components like Nav or Footer
  // that you don't want on the 404 page.
  return (
    <html lang="en" className="light" >
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}