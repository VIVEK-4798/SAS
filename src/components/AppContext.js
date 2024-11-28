"use client"
import React from 'react';
import { SessionProvider } from "next-auth/react";

const AppContext = ({Children}) => {
  return (
    <SessionProvider>
        {Children}
    </SessionProvider>
  )
}

export default AppContext