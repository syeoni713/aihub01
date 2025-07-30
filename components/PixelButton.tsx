import React from 'react';

interface CuteButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const CuteButton: React.FC<CuteButtonProps> = ({ onClick, children, disabled = false, className = '' }) => {
  const baseClasses = "px-6 py-3 text-lg font-bold rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  const activeClasses = "active:translate-y-0.5 active:shadow-sm";
  const disabledClasses = "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : activeClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default CuteButton;
