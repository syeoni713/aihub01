import React from 'react';
import { Role } from '../types';
import CuteButton from './PixelButton';

interface RoleSetupProps {
  roles: Role[];
  onUpdateRole: (index: number, field: keyof Role, value: string) => void;
  onDeleteRole: (index: number) => void;
  onAddRole: () => void;
  onStart: () => void;
}

const RoleSetup: React.FC<RoleSetupProps> = ({ roles, onUpdateRole, onDeleteRole, onAddRole, onStart }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-pink-200">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-pink-500">✨ 역할 정하기 ✨</h2>
        <p className="text-slate-500 mt-2">역할을 자유롭게 수정하거나 추가할 수 있어요. 다 정했으면 시작 버튼을 눌러주세요!</p>
      </div>
      
      <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-4 -mr-4 mb-6">
        {roles.map((role, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-200">
            <input
              type="text"
              value={role.icon}
              onChange={(e) => onUpdateRole(index, 'icon', e.target.value)}
              className="w-14 h-12 text-2xl text-center bg-white rounded-md border border-slate-300 focus:ring-pink-400 focus:border-pink-400"
              maxLength={2}
              aria-label="이모지"
            />
            <div className="flex-grow flex flex-col gap-1">
               <input
                type="text"
                placeholder="역할 이름 (예: 군인)"
                value={role.name}
                onChange={(e) => onUpdateRole(index, 'name', e.target.value)}
                className="w-full p-2 text-md font-bold text-slate-700 bg-white rounded-md border border-slate-300 focus:ring-pink-400 focus:border-pink-400"
                aria-label="역할 이름"
              />
               <input
                type="text"
                placeholder="역할 설명 (예: 줄을 세워요)"
                value={role.description}
                onChange={(e) => onUpdateRole(index, 'description', e.target.value)}
                className="w-full p-2 text-sm text-slate-600 bg-white rounded-md border border-slate-300 focus:ring-pink-400 focus:border-pink-400"
                aria-label="역할 설명"
              />
            </div>
            <button 
              onClick={() => onDeleteRole(index)}
              className="text-red-400 hover:text-red-600 font-bold text-2xl transition-transform hover:scale-125 self-center"
              aria-label="삭제"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-6 border-t border-rose-200 gap-4">
        <CuteButton onClick={onAddRole} className="w-full sm:w-auto bg-sky-400 text-white hover:bg-sky-500 focus:ring-sky-300">
          + 역할 추가하기
        </CuteButton>
        <CuteButton onClick={onStart} className="w-full sm:w-auto bg-green-500 text-white hover:bg-green-600 focus:ring-green-400 text-xl">
          룰렛 시작! →
        </CuteButton>
      </div>
    </div>
  );
};

export default RoleSetup;
