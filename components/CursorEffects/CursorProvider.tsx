"use client";

import React from "react";
import { TrailCursor } from "./TrailCursor";

interface CursorProviderProps {
  children: React.ReactNode;
}

export const CursorProvider: React.FC<CursorProviderProps> = ({ children }) => {
  return (
    <>
      <TrailCursor />
      {children}
    </>
  );
};
