import InteractiveWeb from "@/components/InteractiveWeb";
import React from "react";

const HomePage = () => {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative h-screen">
        <InteractiveWeb zIndex={0} backgroundColor="black" />
        <div className="relative z-10 h-full">
          {/* Hero content */}
          <h1>Hero Section</h1>
        </div>
      </section>

      {/* About Section */}
      <section className="relative min-h-screen bg-white">
        <div className="relative z-10">
          {/* About content */}
          <h2>About Section</h2>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative min-h-screen">
        <InteractiveWeb zIndex={0} backgroundColor="#111" />
        <div className="relative z-10">
          {/* Projects content */}
          <h2>Projects Section</h2>
        </div>
      </section>

      {/* Career Section */}
      <section className="relative min-h-screen bg-white">
        <div className="relative z-10">
          {/* Career content */}
          <h2>Career Section</h2>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative min-h-screen">
        <InteractiveWeb zIndex={0} backgroundColor="#0a0a0a" />
        <div className="relative z-10">
          {/* Education content */}
          <h2>Education Section</h2>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
