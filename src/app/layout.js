import localFont from 'next/font/local';
import SessionWrapper from '../components/sessionWrapper';
import Footer from '../components/layout/footer';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import HeaderWrapper from '../components/layout/HeaderWrapper'; // ⬅️ new wrapper

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <Toaster />
          <HeaderWrapper />
          <main className="max-w-7xl mx-auto p-4 pt-0">{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
