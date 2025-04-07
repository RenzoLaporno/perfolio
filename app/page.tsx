"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HearoSetion from "./components/heros";

gsap.registerPlugin(ScrollTrigger);

export default function GsapShowcase() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: -50,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(aboutRef.current, {
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    const skillItems = skillsRef.current?.querySelectorAll(".skill");
    if (skillItems) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        })
        .from(skillItems, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(1.7)",
        });
    }
  }, []);

  return (
    <main
      className="space-y-24 p-10 text-white min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/profolio.jpg')" }}
    >
      {/* Hero */}
      {/* <section ref={heroRef} className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4 text-black">
          Hey, I’m Renz! 👋
        </h1>
        <p className="text-lg max-w-xl mx-auto text-black">
          I'm a creative developer specializing in modern web animations and
          smooth user experiences.
        </p>
      </section> */}
      <HearoSetion />

      {/* About */}
      <section
        ref={aboutRef}
        className="max-w-4xl mx-auto bg-gray-800 p-10 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-300">
          I've been working in frontend development for a few years, with a
          passion for interactive design. I love using libraries like GSAP to
          make the web feel alive.
        </p>
      </section>

      {/* Skills */}
      <section
        ref={skillsRef}
        className="max-w-4xl mx-auto bg-gray-800 p-10 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-semibold mb-6">Skills</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          {[
            "GSAP",
            "React",
            "Next.js",
            "Tailwind",
            "Framer Motion",
            "TypeScript",
          ].map((skill, i) => (
            <li key={i} className="skill bg-gray-700 py-3 rounded-xl">
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
