export const Navigation = () => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-widget px-6 py-3 rounded-full flex items-center gap-6 z-50 animate-float-delayed">
      <a className="flex flex-col items-center gap-1 group" href="#">
        <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">dashboard</span>
        </div>
      </a>
      <a className="flex flex-col items-center gap-1 group opacity-70 hover:opacity-100 transition-opacity" href="#">
        <div className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <span className="material-symbols-outlined">bar_chart</span>
        </div>
      </a>
      <a className="flex flex-col items-center gap-1 group opacity-70 hover:opacity-100 transition-opacity" href="#">
        <div className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </div>
      </a>
      <div className="w-px h-8 bg-white/20 mx-2"></div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-xs font-bold shadow-md cursor-pointer">
        JD
      </div>
    </nav>
  );
};
