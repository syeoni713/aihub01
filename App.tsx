import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_ROLES } from './constants';
import { Role } from './types';
import CuteButton from './components/PixelButton';
import RoleDisplay from './components/RoleDisplay';
import RoleSetup from './components/RoleSetup';

type View = 'setup' | 'roulette';

const App: React.FC = () => {
  // Overall state
  const [view, setView] = useState<View>('setup');
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);

  // Roulette-specific state
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [assignedRole, setAssignedRole] = useState<Role | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinningText, setSpinningText] = useState("🎲");
  const [allAssigned, setAllAssigned] = useState(false);

  // Spinning animation effect
  useEffect(() => {
    let interval: number | undefined;
    if (isSpinning && availableRoles.length > 0) {
      interval = window.setInterval(() => {
        const randomRole = availableRoles[Math.floor(Math.random() * availableRoles.length)];
        setSpinningText(randomRole.icon);
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isSpinning, availableRoles]);

  // Handler for role setup
  const handleUpdateRole = (index: number, field: keyof Role, value: string) => {
    const newRoles = [...roles];
    newRoles[index] = { ...newRoles[index], [field]: value };
    setRoles(newRoles);
  };

  const handleDeleteRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleAddRole = () => {
    setRoles([...roles, { icon: '✨', name: '', description: '' }]);
  };

  const handleStartRoulette = () => {
    // Filter out empty roles before starting
    const validRoles = roles.filter(role => role.name.trim() !== '' && role.description.trim() !== '');
    if (validRoles.length === 0) {
      alert('시작하려면 역할이 하나 이상 있어야 해요!');
      return;
    }
    setAvailableRoles(validRoles);
    setAssignedRole(null);
    setAllAssigned(false);
    setView('roulette');
  };
  
  const handleBackToSetup = () => {
    setView('setup');
  };

  // Handler for roulette logic
  const handleSpin = useCallback(() => {
    if (isSpinning || availableRoles.length === 0) return;

    setIsSpinning(true);
    setAssignedRole(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableRoles.length);
      const selectedRole = availableRoles[randomIndex];
      
      const remainingRoles = availableRoles.filter((_, index) => index !== randomIndex);
      
      setAssignedRole(selectedRole);
      setAvailableRoles(remainingRoles);
      setIsSpinning(false);

      if (remainingRoles.length === 0) {
        setAllAssigned(true);
      }
    }, 2500);
  }, [isSpinning, availableRoles]);

  const handleResetRoulette = () => {
    // Reset with the roles from the setup screen
    const validRoles = roles.filter(role => role.name.trim() !== '' && role.description.trim() !== '');
    setAvailableRoles(validRoles);
    setAssignedRole(null);
    setAllAssigned(false);
    setIsSpinning(false);
    setSpinningText("🎲");
  };

  const renderRouletteView = () => (
    <div className="flex flex-col items-center">
        <RoleDisplay role={assignedRole} isSpinning={isSpinning} spinningText={spinningText} />
        
        <div className="h-24 flex items-center justify-center space-x-4">
          {!allAssigned ? (
            <CuteButton 
              onClick={handleSpin} 
              disabled={isSpinning || availableRoles.length === 0}
              className="bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-400 text-xl"
            >
              {isSpinning ? '두근두근...' : '내 역할은?!'}
            </CuteButton>
          ) : (
             <div className="text-center">
                <p className="text-2xl text-green-500 font-bold mb-4 animate-pulse">🎉 모든 역할이 정해졌어요! 🎉</p>
             </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4 mt-4">
           <CuteButton onClick={handleBackToSetup} className="bg-gray-400 text-white hover:bg-gray-500 focus:ring-gray-300">
                ← 역할 수정하기
            </CuteButton>
            {(!isSpinning && (allAssigned || availableRoles.length < roles.filter(r => r.name.trim() !== '').length)) && (
             <CuteButton onClick={handleResetRoulette} className="bg-orange-400 text-white hover:bg-orange-500 focus:ring-orange-300">
                다시 돌리기
            </CuteButton>
          )}
        </div>

        <div className="mt-8 text-lg text-slate-500">
          <p>남은 역할: {availableRoles.length}개</p>
        </div>
      </div>
  );


  return (
    <div className="min-h-screen text-slate-800 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 pb-2">
            이번 나의 직업은?
        </h1>
        <p className="text-slate-500 text-lg">우리반 역할 분담 룰렛</p>
      </header>
      
      <main className="w-full flex justify-center">
        {view === 'setup' ? (
          <RoleSetup 
            roles={roles}
            onUpdateRole={handleUpdateRole}
            onDeleteRole={handleDeleteRole}
            onAddRole={handleAddRole}
            onStart={handleStartRoulette}
          />
        ) : (
          renderRouletteView()
        )}
      </main>

      <footer className="absolute bottom-4 text-xs text-slate-400">
        <p>© 2025 박서연</p>
      </footer>
    </div>
  );
};

export default App;