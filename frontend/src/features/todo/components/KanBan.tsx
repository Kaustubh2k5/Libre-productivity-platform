import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import type { TaskStatus } from '../types';
import TaskCard from './TaskCard.js';
import AddTaskForm from './AddTaskform.js';

const KanbanBoard: React.FC = () => {
  const {
    tasks,
    darkMode,
    moveTask,
    deleteTask,
    showAddForm,
    setShowAddForm
  } = useTodo();

  const [hoveredColumn, setHoveredColumn] = useState<TaskStatus | null>(null);

  // Native HTML5 Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      moveTask(id, targetStatus);
    }
    setHoveredColumn(null);
  };

  return (
    <main id="libre-kanban-board" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mt-2 flex-1 min-h-0 lg:overflow-hidden pb-1">
      {/* COLUMN 1: OPEN BACKLOG / IDEAS */}
      <section 
        onDragOver={handleDragOver}
        onDragEnter={() => setHoveredColumn('backlog')}
        onDragLeave={() => setHoveredColumn(null)}
        onDrop={(e) => handleDrop(e, 'backlog')}
        className={`rounded-[28px] p-5 border backdrop-blur-md transition-all min-h-[400px] lg:min-h-0 lg:h-full flex flex-col gap-4 relative group overflow-hidden ${
          hoveredColumn === 'backlog' 
            ? 'border-red-500/50 bg-red-500/[0.02] scale-[1.01] shadow-md shadow-red-500/5' 
            : darkMode 
              ? 'bg-neutral-900/60 border-white/5' 
              : 'bg-white/45 border-white shadow-[0_8px_32px_0_rgba(230,0,0,0.03)]'
        }`}
      >
        <div className={`flex items-center justify-between pb-2 border-b ${
          darkMode ? 'border-neutral-300/30' : 'border-black'
        }`}>
          <div className="flex items-center gap-2">
            <h3 className={`font-serif font-black text-lg uppercase tracking-tight ${darkMode ? 'text-white' : 'text-neutral-950'}`}>
              Open Backlog
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              type="button"
              className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                showAddForm
                  ? 'bg-red-500 text-white border-red-500'
                  : `${darkMode ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'} border-transparent`
              }`}
              title="Add Task to Backlog"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <span className={`px-2.5 py-0.5 font-mono text-[11px] font-bold rounded-full border ${
              darkMode 
                ? 'bg-red-950/40 text-red-400 border-red-900/40' 
                : 'bg-red-50 text-red-700 border-red-200/50'
            }`}>
              {tasks.filter(t => t.status === 'backlog').length}
            </span>
          </div>
        </div>

        {/* Form component */}
        <AddTaskForm />

        {/* Task list Column */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin min-h-0">
          {tasks.filter(t => t.status === 'backlog').length === 0 ? (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 text-center italic text-xs gap-2 select-none ${
              darkMode ? 'text-neutral-300' : 'text-neutral-650'
            }`}>
              <div className={`w-5 h-5 rounded mb-1 ${darkMode ? 'bg-neutral-500' : 'bg-neutral-600'}`} />
              <span>No backlog items. Drop or write a task down below.</span>
            </div>
          ) : (
            tasks.filter(t => t.status === 'backlog').map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                darkMode={darkMode}
                onDragStart={handleDragStart} 
                onDelete={(id, e) => {
                  e.stopPropagation();
                  deleteTask(id);
                }}
                onMoveStatus={(id, status) => moveTask(id, status)}
              />
            ))
          )}
        </div>
      </section>

      {/* COLUMN 2: ACTIVE FOCUS / CURRENT WORKSPACE */}
      <section 
        onDragOver={handleDragOver}
        onDragEnter={() => setHoveredColumn('active')}
        onDragLeave={() => setHoveredColumn(null)}
        onDrop={(e) => handleDrop(e, 'active')}
        className={`rounded-[28px] p-5 border backdrop-blur-md transition-all min-h-[400px] lg:min-h-0 lg:h-full flex flex-col gap-4 relative overflow-hidden ${
          hoveredColumn === 'active' 
            ? 'border-red-500/50 bg-red-500/[0.02] scale-[1.01] shadow-md shadow-red-500/5' 
            : darkMode 
              ? 'bg-neutral-900/60 border-white/5' 
              : 'bg-white/45 border-white shadow-[0_8px_32px_0_rgba(230,0,0,0.03)]'
        }`}
      >
        <div className={`flex items-center justify-between pb-2 border-b ${
          darkMode ? 'border-neutral-300/30' : 'border-black'
        }`}>
          <div className="flex items-center gap-2">
            <h3 className={`font-serif font-black text-lg uppercase tracking-tight ${darkMode ? 'text-white' : 'text-neutral-950'}`}>
              Active
            </h3>
          </div>
          <span className={`px-2.5 py-0.5 font-mono text-[11px] font-bold rounded-full border ${
            darkMode 
              ? 'bg-red-950/40 text-red-400 border-red-900/40' 
              : 'bg-red-50 text-red-700 border-red-200/50'
          }`}>
            {tasks.filter(t => t.status === 'active').length}
          </span>
        </div>

        {/* Task list list */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin min-h-0">
          {tasks.filter(t => t.status === 'active').length === 0 ? (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 text-center italic text-xs gap-2 select-none ${
              darkMode ? 'text-neutral-300' : 'text-neutral-650'
            }`}>
              <div className={`w-5 h-5 rounded-full mb-1 ${darkMode ? 'bg-neutral-500' : 'bg-neutral-600'}`} />
              <span>Focus area empty. Drag your immediate target here.</span>
            </div>
          ) : (
            tasks.filter(t => t.status === 'active').map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                darkMode={darkMode}
                onDragStart={handleDragStart} 
                onDelete={(id, e) => {
                  e.stopPropagation();
                  deleteTask(id);
                }}
                onMoveStatus={(id, status) => moveTask(id, status)}
              />
            ))
          )}
        </div>
      </section>

      {/* COLUMN 3: CONCLUDED / COMPLETED */}
      <section 
        onDragOver={handleDragOver}
        onDragEnter={() => setHoveredColumn('concluded')}
        onDragLeave={() => setHoveredColumn(null)}
        onDrop={(e) => handleDrop(e, 'concluded')}
        className={`rounded-[28px] p-5 border backdrop-blur-md transition-all min-h-[400px] lg:min-h-0 lg:h-full flex flex-col gap-4 relative overflow-hidden ${
          hoveredColumn === 'concluded' 
            ? 'border-red-500/50 bg-red-500/[0.02] scale-[1.01] shadow-md shadow-red-500/5' 
            : darkMode 
              ? 'bg-neutral-900/60 border-white/5' 
              : 'bg-white/45 border-white shadow-[0_8px_32px_0_rgba(230,0,0,0.03)]'
        }`}
      >
        <div className={`flex items-center justify-between pb-2 border-b ${
          darkMode ? 'border-neutral-300/30' : 'border-black'
        }`}>
          <div className="flex items-center gap-2">
            <h3 className={`font-serif font-black text-lg uppercase tracking-tight ${darkMode ? 'text-white' : 'text-neutral-950'}`}>
              Concluded
            </h3>
          </div>
          <span className={`px-2.5 py-0.5 font-mono text-[11px] font-bold rounded-full border ${
            darkMode 
              ? 'bg-red-950/40 text-red-400 border-red-900/40' 
              : 'bg-red-50 text-red-700 border-red-200/50'
          }`}>
            {tasks.filter(t => t.status === 'concluded').length}
          </span>
        </div>

        {/* Task list list */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin min-h-0">
          {tasks.filter(t => t.status === 'concluded').length === 0 ? (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 text-center italic text-xs gap-2 select-none ${
              darkMode ? 'text-neutral-300' : 'text-neutral-650'
            }`}>
              <div className={`w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] mb-1 ${
                darkMode ? 'border-b-neutral-500' : 'border-b-neutral-600'
              }`} />
              <span>Conclude task and drop files or items here.</span>
            </div>
          ) : (
            tasks.filter(t => t.status === 'concluded').map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                darkMode={darkMode}
                onDragStart={handleDragStart} 
                onDelete={(id, e) => {
                  e.stopPropagation();
                  deleteTask(id);
                }}
                onMoveStatus={(id, status) => moveTask(id, status)}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default KanbanBoard;
