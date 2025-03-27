import type { Metadata } from "next";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Mindbend Alumni Network - SVNIT Surat | Gujarat\'s Largest Techno-Managerial Fest Community',
  description: 'Connect with alumni from Mindbend, Gujarat\'s largest annual techfest hosted by Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat. Build professional connections, access mentorship opportunities, and stay updated with the tech community.',
  keywords: 'Mindbend, SVNIT, NIT Surat, Sardar Vallabhbhai National Institute of Technology, techfest, Mindbend Alumni website , mindbend alumni website, Mindbend Alumni,mindbend alumni, mindbend alumni network, Gujarat techfest, Surat engineering, tech community, svnit mindbend alumni website, svnit alumni, svnit alumni website , alumni connections',
  authors: [{ name: 'SVNIT Mindbend Team' }],
  creator: 'SVNIT Mindbend',
  publisher: 'Sardar Vallabhbhai National Institute of Technology',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Mindbend Alumni Network',
    description: 'Join the alumni network of Mindbend, the premier technical festival of SVNIT Surat. Connect with tech professionals, access career opportunities, and stay involved with Gujarat\'s leading technical community.',
    type: 'website',
    url: 'https://alumni.mindbend-svnit.com/',
    siteName: 'Mindbend Alumni Network',
    locale: 'en_IN',
    images: [
      {
        url: '/images/logomain.png',
        width: 1200,
        height: 630,
        alt: 'Mindbend Alumni Network',
      },
    ],
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <meta
          name="google-site-verification"
          content="zG6R5FqA8gjsswGeRf5_YJh4Ev53fke87na_6SF-W3U"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased` }
      >
       <NextAuthProvider>{children}</NextAuthProvider> 
      </body>
    </html>
  );
}
