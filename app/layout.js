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
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },

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