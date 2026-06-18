import React from 'react';
import { motion } from 'framer-motion';
import type { Task, TaskStatus } from '../types';
import { getTagRedHSL } from '../utils/helpers';

interface TaskCardProps {
  task: Task;
  darkMode: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onMoveStatus: (id: string, status: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, darkMode, onDragStart, onDelete, onMoveStatus }) => {
  const primaryTag = task.tags[0] || 'General';
  const tagColor = getTagRedHSL(primaryTag, darkMode, false);
  const isConcluded = task.status === 'concluded';

  return (
    <motion.div
      layout
      draggable={!isConcluded}
      onDragStart={(e: any) => {
        if (isConcluded) {
          e.preventDefault();
          return;
        }
        onDragStart(e, task.id);
      }}
      className={`p-4 rounded-2xl border transition-all duration-300 group select-none relative ${
        isConcluded 
          ? 'cursor-default opacity-85' 
          : 'cursor-grab active:cursor-grabbing hover:shadow-lg hover:-translate-y-1'
      } ${
        darkMode 
          ? `bg-neutral-950 border-white/5 text-white ${isConcluded ? '' : 'hover:border-red-500/20'}` 
          : `bg-white/70 backdrop-blur-md border border-white/60 text-neutral-900 shadow-sm shadow-neutral-200/40 ${isConcluded ? '' : 'hover:border-red-500/35 hover:bg-white/85'}`
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className={`text-[14px] font-bold leading-snug pr-1 transform group-hover:-translate-y-0.5 transition-transform duration-300 ${
          darkMode ? 'text-neutral-100' : 'text-neutral-900'
        }`}>
          {task.title}
        </p>
        
        {/* Top-right elements: Trash button */}
        <div className="flex items-center shrink-0">
          <button
            onClick={(e) => onDelete(task.id, e)}
            className="opacity-0 group-hover:opacity-100 px-1.5 py-0.5 text-[11px] font-mono font-bold text-neutral-400 hover:text-red-600 transition-all rounded-lg cursor-pointer"
            title="Trash task objective"
          >
            [×]
          </button>
        </div>
      </div>

      {/* Structured, clean inline list parameter items */}
      <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 mt-3.5 text-[11px] font-mono font-bold transform group-hover:-translate-y-0.5 transition-transform duration-300 ${
        darkMode ? 'text-neutral-400' : 'text-neutral-500'
      }`}>
        <span className={`uppercase tracking-tight ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{task.priority}</span>

        {task.timeSlot && (
          <>
            <span>•</span>
            <span className={darkMode ? 'text-neutral-400' : 'text-neutral-500'}>
              {task.timeSlot}
            </span>
          </>
        )}

        {task.tags.map(tag => {
          const color = getTagRedHSL(tag, darkMode, true);
          return (
            <React.Fragment key={tag}>
              <span>•</span>
              <span style={{ color }} className="font-semibold tracking-tight">
                #{tag}
              </span>
            </React.Fragment>
          );
        })}
      </div>

      {/* Manual Quick Action buttons */}
      <div className="flex justify-end gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {task.status !== 'concluded' && task.status !== 'backlog' && (
          <button 
            onClick={() => onMoveStatus(task.id, 'backlog')}
            className={`px-2.5 py-1 text-[9px] font-mono uppercase border rounded-lg transition-colors cursor-pointer ${
              darkMode 
                ? 'bg-red-500/5 hover:bg-red-600 text-red-400 border-red-500/10 hover:border-transparent' 
                : 'bg-red-50 hover:bg-red-600 text-red-700 border-red-200 hover:text-white'
            }`}
            title="Move to Backlog"
          >
            Backlog
          </button>
        )}
        {task.status !== 'concluded' && task.status !== 'active' && (
          <button 
            onClick={() => onMoveStatus(task.id, 'active')}
            className={`px-2.5 py-1 text-[9px] font-mono uppercase border rounded-lg transition-colors cursor-pointer ${
              darkMode 
                ? 'bg-red-500/5 hover:bg-red-600 text-red-400 border-red-500/10 hover:border-transparent' 
                : 'bg-red-50 hover:bg-red-600 text-red-700 border-red-200 hover:text-white'
            }`}
            title="Move to Active Focus"
          >
            Focus
          </button>
        )}
        {task.status !== 'concluded' && (
          <button 
            onClick={() => onMoveStatus(task.id, 'concluded')}
            className={`px-2.5 py-1 text-[9px] font-mono uppercase rounded-lg border transition-all duration-300 cursor-pointer shadow-sm font-bold ${
              darkMode 
                ? 'bg-red-650 text-white border-transparent hover:scale-105' 
                : 'bg-neutral-100 text-black border-neutral-300/80 hover:scale-105'
            }`}
            title="Log and Conclude Task"
          >
            Conclude
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
