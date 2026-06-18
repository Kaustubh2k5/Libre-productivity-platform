import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { TodoProvider, useTodo } from '../context/TodoContext.js';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import BentoStats from '../components/BentoStats';
import KanbanBoard from '../components/KanBan';
import TimetableModal from '../modals/TimetableModal';
import LogProgressModal from '../modals/LogProgressModal';

function DailyTodoContent() {
  const { darkMode, setDarkMode, triggerToast } = useTodo();

  const backgroundStyle = darkMode 
    ? {
        backgroundColor: '#050000',
        backgroundImage: `
          radial-gradient(circle at 50% 110%, rgba(230, 0, 0, 0.45) 0%, transparent 60%),
          radial-gradient(circle at 0% 0%, rgba(230, 0, 0, 0.1) 0%, transparent 40%),
          radial-gradient(circle at 100% 0%, rgba(230, 0, 0, 0.1) 0%, transparent 40%)
        `,
        backgroundAttachment: 'fixed' as const,
      }
    : {
        backgroundColor: '#ffffff',
        backgroundImage: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.98) 45%, rgba(112, 0, 0, 0.12) 100%),
          radial-gradient(circle at 0% 0%, rgba(112, 0, 0, 0.06) 0%, transparent 45%),
          radial-gradient(circle at 100% 100%, rgba(112, 0, 0, 0.16) 0%, transparent 55%),
          radial-gradient(circle at 50% 115%, rgba(112, 0, 0, 0.20) 0%, transparent 75%)
        `,
        backgroundAttachment: 'fixed' as const,
      };

  return (
    <div 
      style={backgroundStyle}
      className={`min-h-screen lg:h-screen lg:overflow-hidden transition-colors duration-500 relative ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}
    >
      {/* Dynamic Background Noise Overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-5 mix-blend-overlay z-0" />

      {/* Toast Alert */}
      <Toast />

      <div className="flex min-h-screen lg:min-h-0 lg:h-full relative z-10 p-0 md:p-4 gap-0 md:gap-4 overflow-hidden">
        
        {/* VERTICAL SIDEBAR SIDE NAV */}
        <Sidebar />

        {/* MAIN TELEMETRY WORKSPACE AREA */}
        <div className="flex-1 flex flex-col gap-6 p-4 md:p-6 lg:p-4 overflow-y-auto lg:overflow-hidden max-w-full h-full min-h-0 animate-fade-in">
          
          {/* HEADER NAV SYSTEM BAR */}
          <header className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b select-none shrink-0 ${
            darkMode ? 'border-neutral-300/40' : 'border-black'
          }`}>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="lg:hidden w-3 h-3 rounded-full bg-red-600" />
                <h1 className={`text-3xl font-bold font-serif uppercase tracking-tight ${darkMode ? 'text-white' : 'text-neutral-950'}`}>
                  My Todo
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Dark mode selector */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-center w-10 h-10 ${
                  darkMode 
                    ? 'bg-neutral-900 border-white/10 text-white hover:bg-neutral-850' 
                    : 'bg-white border-neutral-300/60 text-neutral-900 hover:bg-neutral-50'
                }`}
                title="Toggle Mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-white fill-white" />
                ) : (
                  <Moon className="w-5 h-5 text-neutral-900 fill-neutral-900" />
                )}
              </button>
            </div>
          </header>

          {/* MOBILE VIEW NAVIGATION ROW */}
          <div className={`flex lg:hidden items-center justify-around p-3 rounded-2xl border select-none gap-2 transition-all duration-300 ${
            darkMode 
              ? 'bg-neutral-900 border-white/5 text-white' 
              : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-200/50'
          }`}>
            <Link 
              to="/" 
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                darkMode ? 'text-red-500 bg-white/5 hover:bg-white/10' : 'text-red-600 bg-neutral-100 hover:bg-neutral-200'
              }`}
            >
              Libre
            </Link>
            <Link 
              to="/dailytodo" 
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                darkMode ? 'text-white hover:text-red-400' : 'text-neutral-950 hover:text-red-600'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-white' : 'bg-neutral-950'}`} />
              <span>Todo</span>
            </Link>
            <Link 
              to="/sandbox" 
              className={`text-xs font-medium transition-colors ${
                darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-950'
              }`}
            >
              Sandbox
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-xs font-medium transition-colors ${
                darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-950'
              }`}
            >
              Dashboard
            </Link>
            <button 
              onClick={() => {
                triggerToast("Ending active session...");
                setTimeout(() => window.location.href = "/", 1000);
              }}
              className="text-xs text-red-500 hover:text-red-600 font-medium font-mono cursor-pointer"
            >
              Exit
            </button>
          </div>

          {/* BENTO STATS GRID SYSTEM */}
          <BentoStats />

          {/* MAIN COLUMN KANBAN BOARDS */}
          <KanbanBoard />

        </div>
      </div>

      {/* PLAN THE NEXT DAY Timetable planning Drawer */}
      <TimetableModal />

      {/* TASK LOGGING POPUP MODAL */}
      <LogProgressModal />
    </div>
  );
}

export default function DailyTodoPage() {
  return (
    <TodoProvider>
      <DailyTodoContent />
    </TodoProvider>
  );
}
