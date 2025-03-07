import About from "@/components/About";
import CareerSection from "@/components/Career";
import ContactForm from "@/components/Contact";
import EducationSection from "@/components/Education";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/Projects";
import SkillsSection from "@/components/Skills";
import TestimonialSection from "@/components/Testimonials";
import React from "react";

const HomePage = () => {
  return (
    <div className="">
      <Hero />
      <About />
      <CareerSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <TestimonialSection />
      <ContactForm />
    </div>
  );
};

export default HomePage;
