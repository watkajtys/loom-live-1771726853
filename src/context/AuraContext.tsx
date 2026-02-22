import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export type TimerMode = 'focus' | 'break';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category?: string;
}

export interface AudioVolumes {
  rain: number;
  cafe: number;
  waves: number;
  forest: number;
}

interface AuraContextType {
  // Timer
  timeLeft: number;
  isActive: boolean;
  mode: TimerMode;
  toggleTimer: () => void;
  resetTimer: () => void;
  setMode: (mode: TimerMode) => void;
  
  // Audio
  volumes: AudioVolumes;
  updateVolume: (track: keyof AudioVolumes, value: number) => void;
  
  // Tasks
  tasks: Task[];
  activeTaskId: string | null;
  setActiveTask: (id: string | null) => void;
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
}

const AuraContext = createContext<AuraContextType | undefined>(undefined);

// Audio Tracks (using mixkit previews as placeholders)
const TRACKS = {
  rain: 'https://assets.mixkit.co/active_storage/sfx/2436/2436-preview.mp3', 
  cafe: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', 
  waves: 'https://assets.mixkit.co/active_storage/sfx/265/265-preview.mp3', 
  forest: 'https://assets.mixkit.co/active_storage/sfx/1239/1239-preview.mp3', 
};

export const AuraProvider = ({ children }: { children: ReactNode }) => {
  // Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');

  // Audio State
  const [volumes, setVolumes] = useState<AudioVolumes>({
    rain: 40, // Start with some rain
    cafe: 0,
    waves: 0,
    forest: 0,
  });
  
  // Tasks State
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Morning Standup Notes', completed: false, category: 'work' },
    { id: '2', text: 'Draft Q3 Report Section', completed: false, category: 'work' },
    { id: '3', text: 'Review Design System', completed: false, category: 'design' },
    { id: '4', text: 'Email Catch-up', completed: false, category: 'admin' },
    { id: '5', text: 'Update Kanban', completed: false, category: 'admin' },
    { id: '6', text: 'Lunch Order', completed: false, category: 'personal' },
  ]);

  const [activeTaskId, setActiveTask] = useState<string | null>(null);

  // Audio Refs & Initialization
  const audioRefs = useRef<{ [key in keyof AudioVolumes]?: HTMLAudioElement }>({});
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  useEffect(() => {
    // Initialize audio objects
    Object.keys(TRACKS).forEach((key) => {
      const trackKey = key as keyof AudioVolumes;
      if (!audioRefs.current[trackKey]) {
        const audio = new Audio(TRACKS[trackKey]);
        audio.loop = true;
        audio.volume = volumes[trackKey] / 100;
        audioRefs.current[trackKey] = audio;
      }
    });

    // Cleanup
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  // Sync Audio Volumes & Play State
  useEffect(() => {
    Object.keys(volumes).forEach((key) => {
      const trackKey = key as keyof AudioVolumes;
      const audio = audioRefs.current[trackKey];
      if (audio) {
        const volume = volumes[trackKey] / 100;
        audio.volume = volume;
        
        if (volume > 0 && isAudioInitialized && audio.paused) {
            audio.play().catch(e => console.log(`Audio play failed for ${trackKey}:`, e));
        } else if (volume === 0 && !audio.paused) {
            audio.pause();
        }
      }
    });
  }, [volumes, isAudioInitialized]);

  const enableAudio = () => {
    if (!isAudioInitialized) {
      setIsAudioInitialized(true);
    }
  };

  // Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play alarm sound
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
      enableAudio();
      setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const handleSetMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  // Audio Logic
  const updateVolume = (track: keyof AudioVolumes, value: number) => {
    enableAudio();
    setVolumes((prev) => ({ ...prev, [track]: value }));
  };

  // Task Logic
  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    setTasks((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return (
    <AuraContext.Provider
      value={{
        timeLeft,
        isActive,
        mode,
        toggleTimer,
        resetTimer,
        setMode: handleSetMode,
        volumes,
        updateVolume,
        tasks,
        activeTaskId,
        setActiveTask,
        addTask,
        toggleTask,
        removeTask,
        reorderTasks,
      }}
    >
      {children}
    </AuraContext.Provider>
  );
};

export const useAura = () => {
  const context = useContext(AuraContext);
  if (context === undefined) {
    throw new Error('useAura must be used within an AuraProvider');
  }
  return context;
};
