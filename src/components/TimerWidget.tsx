import { useAura } from '../context/AuraContext';

export const TimerWidget = () => {
  const { timeLeft, isActive, mode, toggleTimer, resetTimer, setMode } = useAura();

  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 283; // 283 is circumference of circle with r=45

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-widget w-80 h-80 rounded-full flex flex-col items-center justify-center relative animate-float shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
      <svg className="absolute inset-0 w-full h-full -rotate-90 p-4" viewBox="0 0 100 100">
        <circle cx="50" cy="50" fill="none" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="3"></circle>
        <circle 
          className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-linear" 
          cx="50" cy="50" fill="none" r="45" stroke="white" 
          strokeDasharray="283" 
          strokeDashoffset={283 - progress} 
          strokeLinecap="round" 
          strokeWidth="3"
        ></circle>
      </svg>
      <div className="flex flex-col items-center z-10">
        <div className="flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm cursor-pointer" onClick={() => setMode(mode === 'focus' ? 'break' : 'focus')}>
          <span className={`w-2 h-2 rounded-full ${mode === 'focus' ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></span>
          <span className="text-xs font-semibold text-white uppercase tracking-widest">{mode === 'focus' ? 'Focus' : 'Break'}</span>
        </div>
        <div className="text-7xl font-light text-white tracking-tighter drop-shadow-lg mb-2 select-none font-mono">
          {formatTime(timeLeft)}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button 
            onClick={resetTimer}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all"
          >
            <span className="material-symbols-outlined text-xl">restart_alt</span>
          </button>
          <button 
            onClick={toggleTimer}
            className="w-16 h-16 rounded-full bg-white text-primary shadow-lg hover:scale-110 active:scale-95 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-3xl fill-1">{isActive ? 'pause' : 'play_arrow'}</span>
          </button>
          <button 
            onClick={() => setMode(mode === 'focus' ? 'break' : 'focus')}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-all"
          >
            <span className="material-symbols-outlined text-xl">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
