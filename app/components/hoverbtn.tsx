import React from "react";

interface SplashButtonProps {
  label: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
}

const SplashButton: React.FC<SplashButtonProps> = ({
  label,
  width = 100,
  height = 50,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden border border-black rounded-md font-light transition-all duration-500 tracking-wide ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <button
        onClick={onClick}
        className="btn-splash w-[101%] h-full text-[11px] font-bold tracking-wide"
      >
        {label}
      </button>
    </div>
  );
};

export default SplashButton;
