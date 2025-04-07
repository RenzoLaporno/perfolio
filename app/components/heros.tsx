import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r h-screen flex flex-col justify-center text-white">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center h-full text-center">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Hi, I'm <span className="text-[#036a7c]">Renzo!</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl font-light mb-6">
          A passionate <span className="font-semibold">Software Developer</span>{" "}
          focused on building efficient and scalable solutions.
        </p>

        {/* Call-to-action button */}
        <div className="flex space-x-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-[#036a7c] text-white rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-[#036a7c]/90"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-transparent border-2 border-[#036a7c] text-white rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 hover:border-[#036a7c] hover:text-[#036a7c]"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Background Visual (Optional - Illustration or Image) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
    </section>
  );
};

export default HeroSection;
