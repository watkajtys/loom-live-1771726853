import { useAura } from '../context/AuraContext';
import type { AudioVolumes } from '../context/AuraContext';

export const AmbienceMixer = () => {
  const { volumes, updateVolume } = useAura();

  const tracks: { id: keyof AudioVolumes; icon: string; colorClass: string; hoverColorClass: string }[] = [
    { id: 'rain', icon: 'rainy', colorClass: 'bg-blue-400/50', hoverColorClass: 'group-hover:bg-blue-400/70' },
    { id: 'cafe', icon: 'storefront', colorClass: 'bg-orange-400/50', hoverColorClass: 'group-hover:bg-orange-400/70' },
    { id: 'waves', icon: 'waves', colorClass: 'bg-pink-400/50', hoverColorClass: 'group-hover:bg-pink-400/70' },
    { id: 'forest', icon: 'forest', colorClass: 'bg-green-400/50', hoverColorClass: 'group-hover:bg-green-400/70' },
  ];

  return (
    <div className="glass-widget w-full h-32 rounded-[2rem] px-8 py-4 flex items-center justify-between animate-float-delayed relative">
      <div className="absolute -top-3 left-8 px-3 py-0.5 bg-white/30 backdrop-blur-md rounded-full border border-white/20">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white">Ambience</span>
      </div>
      {tracks.map((track) => (
        <div key={track.id} className="flex flex-col items-center gap-2 h-full justify-center group">
          <div className="relative w-8 h-16 bg-white/10 rounded-full flex justify-center overflow-hidden">
            <div 
              className={`absolute bottom-0 w-full ${track.colorClass} ${track.hoverColorClass} transition-all`}
              style={{ height: `${volumes[track.id]}%` }}
            ></div>
            <input 
              className="absolute w-full h-full opacity-0 cursor-pointer z-10" 
              style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
              type="range" 
              min="0"
              max="100"
              value={volumes[track.id]}
              onChange={(e) => updateVolume(track.id, parseInt(e.target.value))}
            />
          </div>
          <span className="material-symbols-outlined text-white/80 text-lg">{track.icon}</span>
        </div>
      ))}
    </div>
  );
};
