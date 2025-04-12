"use client";
import { GiGiftOfKnowledge } from "react-icons/gi";
import { FcBriefcase, FcDownload } from "react-icons/fc";

const Navbar = () => {
  const menuItems = [
    { label: "Experience", icon: <FcBriefcase size={24} /> },
    { label: "Projects", icon: <GiGiftOfKnowledge size={24} /> },
    { label: "Resume", icon: <FcDownload size={24} /> },
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-md shadow-md text-black p-4 px-4 fixed top-0 w-full z-50">
      <div className="flex gap-4 container mx-auto">
      <div className="relative inline-flex items-center text-xl font-bold px-3 py-1 rounded-md tracking-normal transition-all duration-300 group"
          > 
            {/* Icon and Text */}
            <span className="flex items-center gap-2">
              Perfolio
            </span>

            {/* Top Line */}
            <span className="pointer-events-none absolute left-1/2 top-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-[70%] group-hover:left-[15%]" />

            {/* Bottom Line */}
            <span className="pointer-events-none absolute left-1/2 bottom-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-[70%] group-hover:left-[15%]" />
          </div>
        {menuItems.map(({ label, icon }) => (
          <button
            key={label}
            className="relative inline-flex items-center text-xl font-bold px-3 py-1 rounded-md tracking-normal transition-all duration-300 group"
          >
            {/* Icon and Text */}
            <span className="flex items-center gap-2">
              {icon} <span>{label}</span>
            </span>

            {/* Top Line */}
            <span className="pointer-events-none absolute left-1/2 top-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-[70%] group-hover:left-[15%]" />

            {/* Bottom Line */}
            <span className="pointer-events-none absolute left-1/2 bottom-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-[70%] group-hover:left-[15%]" />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
