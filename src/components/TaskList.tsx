import { useState } from 'react';
import { useAura } from '../context/AuraContext';

export const TaskList = () => {
  const { tasks, toggleTask, addTask, reorderTasks, activeTaskId, setActiveTask } = useAura();
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      addTask(newTaskText);
      setNewTaskText('');
      setIsAdding(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddTask();
    if (e.key === 'Escape') setIsAdding(false);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Make the drag image transparent or custom if desired, but default is fine
    // e.dataTransfer.setDragImage(e.currentTarget, 0, 0); 
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Necessary to allow dropping
    if (draggedIndex === null || draggedIndex === index) return;
    
    // Optional: visual feedback for drop target
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      reorderTasks(draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
  };

  return (
    <div className="hidden lg:flex flex-col justify-center items-start w-1/4 h-[80%]">
      <div className="glass-widget w-full h-full rounded-[3rem] p-6 flex flex-col relative animate-float-slow">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              <span className="material-symbols-outlined">check</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Tasks</h2>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg ${isAdding ? 'bg-white/20 text-white rotate-45' : 'bg-white text-primary hover:scale-110'}`}
          >
            <span className="material-symbols-outlined font-bold">add</span>
          </button>
        </div>

        {isAdding && (
             <div className="px-1 mb-3 animate-fade-in">
                <input 
                    autoFocus
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Type task & enter..."
                    className="w-full bg-white/10 text-white placeholder-white/50 rounded-xl px-3 py-2 outline-none border border-white/20 focus:border-white/50 transition-all backdrop-blur-sm"
                />
             </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 px-1">
          {tasks.map((task, index) => (
            <div 
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => setActiveTask(task.id)}
              className={`group flex items-center gap-3 p-3 rounded-2xl transition-all border cursor-move
                ${activeTaskId === task.id ? 'border-white bg-white/20 shadow-lg scale-[1.02]' : 'border-transparent hover:border-white/20'}
                ${task.completed ? 'bg-white/5 opacity-50' : (activeTaskId === task.id ? '' : 'bg-white/10')}
                ${draggedIndex === index ? 'opacity-20 border-dashed border-white' : ''}
              `}
            >
              <div 
                onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
                className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${task.completed ? 'border-white bg-white' : 'border-white/40 group-hover:border-white'}`}
              >
                 {task.completed && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <span 
                onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
                className={`text-sm font-medium flex-1 cursor-pointer ${task.completed ? 'text-white/50 line-through' : 'text-white/90'}`}
              >
                {task.text}
              </span>
              <span className="material-symbols-outlined text-white/20 group-hover:text-white/50 text-sm cursor-grab active:cursor-grabbing">drag_indicator</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
