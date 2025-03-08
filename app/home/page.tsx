"use client";
import Hero from "@/components/Hero";
import React from "react";
import About from "../about/page";
import CareerSection from "@/components/Career";
import EducationSection from "@/components/Education";
import SkillsSection from "@/components/Skills";
import ProjectsSection from "@/components/Projects";
import TestimonialSection from "@/components/Testimonials";
import ContactForm from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <About />
      <CareerSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <TestimonialSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default HomePage;
