"use client";
import React from "react";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const CareerSection = dynamic(() => import("@/components/Career"), {
  ssr: false,
});
const EducationSection = dynamic(() => import("@/components/Education"), {
  ssr: false,
});
const SkillsSection = dynamic(() => import("@/components/Skills"), {
  ssr: false,
});
const ProjectsSection = dynamic(() => import("@/components/Projects"), {
  ssr: false,
});
const TestimonialSection = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
});
const ContactForm = dynamic(() => import("@/components/Contact"), {
  ssr: false,
});

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
