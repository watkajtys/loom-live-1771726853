import { useAura } from '../context/AuraContext';
import type { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { mode } = useAura();

  return (
    <div className={`font-display min-h-screen relative overflow-hidden flex flex-col justify-center items-center transition-colors duration-1000 ${mode === 'focus' ? 'bg-[#2d1b2e]' : 'bg-[#1b2e2d]'}`}>
      <div className={`absolute inset-0 z-0 bg-gradient-to-br transition-all duration-1000 ${mode === 'focus' ? 'from-[#ff9a9e] via-[#fad0c4] to-[#fbc2eb]' : 'from-[#9a9eff] via-[#d0c4fa] to-[#c2ebfb]'}`}>
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#ffecd2] opacity-60 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#fcb69f] opacity-60 blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#ff9a9e] opacity-40 blur-[90px] animate-float"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] rounded-full bg-[#a18cd1] opacity-30 blur-[70px] animate-float-delayed"></div>
      </div>
      <div className="relative z-10 w-full max-w-[1400px] h-[90vh] p-4 flex gap-8 justify-center items-center">
        {children}
      </div>
    </div>
  );
};
