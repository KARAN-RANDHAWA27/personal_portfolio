"use client";
import { useState } from "react";
import Preloader from "@/components/Preloader";
import HomePage from "./home/page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Preloader onLoadingComplete={() => setLoading(false)} />
      ) : (
        <main>
          <Navbar />
          <HomePage />
          <Footer   />
        </main>
      )}
    </>
  );
}
