const Navbar = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-md shadow-md text-black p-4 px-4 fixed top-0 w-full z-50">
      <div className="flex gap-4 container mx-auto">
        {["Profolio", "Experience", "Projects", "Resume"].map((item) => (
          <button
            key={item}
            className="relative inline-block text-xl font-bold px-3 py-1 rounded-md tracking-normal transition-all duration-300 group"
          >
            <span className="relative z-10">{item}</span>

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
