import { useAura } from '../context/AuraContext';
import type { AudioVolumes } from '../context/AuraContext';

export const AmbienceMixer = () => {
  const { volumes, updateVolume } = useAura();

  const tracks: { id: keyof AudioVolumes; icon: string; color: string }[] = [
    { id: 'rain', icon: 'rainy', color: 'bg-blue-400' },
    { id: 'cafe', icon: 'storefront', color: 'bg-orange-400' },
    { id: 'waves', icon: 'waves', color: 'bg-pink-400' },
    { id: 'forest', icon: 'forest', color: 'bg-green-400' },
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
              className={`absolute bottom-0 w-full ${track.color}/50 group-hover:${track.color}/70 transition-all`}
              style={{ height: `${volumes[track.id]}%` }}
            ></div>
            <input 
              className="absolute w-full h-full opacity-0 cursor-pointer z-10" 
              type="range" 
              // @ts-ignore
              orient="vertical"
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
