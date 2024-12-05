"use client"
import React from 'react';
import { SessionProvider } from "next-auth/react";

export function AppProvider({Children}) {
  return (
    <SessionProvider>
        {Children}
    </SessionProvider>
  );
}

