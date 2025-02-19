import React from "react";

const About = () => {
  return (
    <div id="about" className="relative bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">About Us</h2>
        <div className="space-y-6 text-gray-300">
          <p>
            We are a creative studio passionate about bringing innovative ideas
            to life. Our team of designers, developers, and creative thinkers
            work together to create exceptional digital experiences.
          </p>
          <p>
            Founded in 2020, we&apos;ve been at the forefront of digital
            transformation, helping businesses and individuals realize their
            creative potential through cutting-edge technology and design.
          </p>
          <p>
            Our approach combines artistic vision with technical expertise,
            ensuring each project we undertake pushes the boundaries of
            what&apos;s possible in digital design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
