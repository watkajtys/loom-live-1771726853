export const StatsWidget = () => {
  return (
    <div className="hidden lg:flex flex-col justify-center items-end gap-12 w-1/5 h-full relative">
      <div className="glass-bubble w-32 h-32 rounded-full flex flex-col items-center justify-center animate-float relative group cursor-pointer hover:bg-white/30 transition-all">
        <span className="material-symbols-outlined text-orange-500 text-3xl mb-1">local_fire_department</span>
        <span className="text-3xl font-bold text-white drop-shadow-md">12</span>
        <span className="text-xs font-medium text-white/80 uppercase tracking-wide">Streak</span>
        <div className="absolute -right-2 top-0 w-3 h-3 bg-red-400 rounded-full border border-white animate-ping"></div>
      </div>
      <div className="glass-bubble w-40 h-40 rounded-full flex flex-col items-center justify-center animate-float-delayed relative ml-8 group cursor-pointer hover:bg-white/30 transition-all">
        <span className="material-symbols-outlined text-purple-600 text-3xl mb-1">target</span>
        <div className="text-center">
          <span className="text-2xl font-bold text-white drop-shadow-md">4.5</span>
          <span className="text-xs text-white/70 block">/ 6 hrs</span>
        </div>
        <div className="w-16 h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden">
          <div className="h-full w-[75%] bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)]"></div>
        </div>
      </div>
    </div>
  );
};
