import {Outfit} from 'next/font/google';
import './globals.css';

import {SidebarProvider} from '@/context/SidebarContext';
import {ThemeProvider} from '@/context/ThemeContext';

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Recaudify",
    template: "%s | Recaudify",
  },
  icons: {
    icon: [
      {url: "/favicon.ico"},
      {url: "/favicon-32x32.png", sizes: "32x32", type: "image/png"},
      {url: "/favicon-16x16.png", sizes: "16x16", type: "image/png"},
      {url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png"},
      {url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png"},
    ],
    apple: [
      {url: "/apple-touch-icon.png", sizes: "180x180"},
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" translate="no" suppressHydrationWarning>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
