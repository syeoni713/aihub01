import React from 'react';
import { Role } from '../types';

interface RoleDisplayProps {
  role: Role | null;
  isSpinning: boolean;
  spinningText: string;
}

const RoleDisplay: React.FC<RoleDisplayProps> = ({ role, isSpinning, spinningText }) => {
  const containerClasses = "w-full max-w-md h-64 bg-white rounded-2xl border-4 border-pink-300 text-slate-800 p-6 flex flex-col items-center justify-center text-center shadow-xl mb-12 transform transition-transform hover:scale-105";

  if (isSpinning) {
    return (
      <div className={containerClasses}>
        <div className="text-6xl animate-bounce">{spinningText}</div>
        <p className="mt-4 text-pink-500 text-xl font-bold">누가 될까? 두근두근...</p>
      </div>
    );
  }

  if (role) {
    return (
      <div className={containerClasses}>
        <div className="text-7xl mb-4 transform transition-transform group-hover:rotate-12">{role.icon}</div>
        <h2 className="text-4xl text-sky-500 font-bold mb-2">{role.name}</h2>
        <p className="text-lg text-slate-600">{role.description}</p>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <h2 className="text-3xl text-green-500 font-bold">룰렛을 돌려주세요!</h2>
      <p className="mt-4 text-slate-500">아래 버튼을 눌러 당신의 직업을 뽑아보세요!</p>
    </div>
  );
};

export default RoleDisplay;
