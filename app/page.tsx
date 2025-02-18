"use client";
import { useState } from "react";
import Preloader from "@/components/Preloader";
import HomePage from "./home/page";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Preloader onLoadingComplete={() => setLoading(false)} />
      ) : (
        <main>
          <HomePage />
        </main>
      )}
    </>
  );
}
