import localFont from "next/font/local";
import SessionWrapper from "../components/sessionWrapper"; 
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Pizzeria",
  description: "Best Pizza ordering app",
  icons: {
    icon: "/pizzeria-logo.jpg", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper> 
          <main className="max-w-7xl mx-auto p-4">
            <Toaster/>
            <Header />
            {children}
            <Footer />
          </main>
        </SessionWrapper>
      </body>
    </html>
  );
}
