import localFont from 'next/font/local';
import Script from 'next/script'; // Import GA script
import SessionWrapper from '../components/sessionWrapper';
import Footer from '../components/layout/footer';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import HeaderWrapper from '../components/layout/HeaderWrapper';
import StickyHeader from '../components/layout/StickyHeader';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'SAS',
  description: 'Best Shopping app',
  icons: {
    icon: '/sas-logo.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics 4 Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4YVBGVR798"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4YVBGVR798');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <Toaster />
          <HeaderWrapper />
          <StickyHeader/>
          <main className="max-w-7xl mx-auto p-4 pt-0">{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
