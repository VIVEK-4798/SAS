"use client";

import { HelmetProvider } from "react-helmet-async";

export default function ClientLayoutWrapper({ children }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}
