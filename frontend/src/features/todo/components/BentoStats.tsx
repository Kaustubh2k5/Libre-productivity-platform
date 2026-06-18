import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { getTagRedHSL } from '../utils/helpers';

const BentoStats: React.FC = () => {
  const { tasks, darkMode, setIsPlanningOpen } = useTodo();

  const openTasksCount = tasks.filter(t => t.status === 'backlog').length;
  const finishedTasksCount = tasks.filter(t => t.status === 'concluded').length;

  const allocationTasks = tasks.filter(t => t.status !== 'concluded');
  const tagsHoursMap: Record<string, number> = {};
  allocationTasks.forEach(t => {
    const primaryTag = t.tags[0] || 'General';
    const hr = typeof t.hours === 'number' ? t.hours : 1;
    tagsHoursMap[primaryTag] = (tagsHoursMap[primaryTag] || 0) + hr;
  });

  const totalAllocHours = Object.values(tagsHoursMap).reduce((acc, h) => acc + h, 0);

  const tagJigsawTiles = Object.entries(tagsHoursMap).map(([tag, hours]) => {
    const percentage = totalAllocHours > 0 ? Math.round((hours / totalAllocHours) * 100) : 0;
    const seed = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const flexGrow = (seed % 3) + 1;
    const order = (seed * 11) % 41;

    return {
      tag,
      hours,
      percentage: Math.max(percentage, 10),
      color: getTagRedHSL(tag, darkMode, false),
      flexGrow,
      order
    };
  }).sort((a, b) => a.order - b.order);

  return (
    <section id="libre-bento-stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 select-none shrink-0">
      
      {/* CARD 1: OPEN */}
      <div className={`p-6 rounded-[28px] border backdrop-blur-md transition-all duration-300 relative flex flex-col justify-center min-h-[140px] shadow-sm ${
        darkMode ? 'bg-neutral-900/60 border-white/5' : 'bg-white/45 border-white shadow-[0_8px_32px_0_rgba(230,0,0,0.04)]'
      }`}>
        <span className={`text-xs font-semibold uppercase tracking-widest font-mono ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          Open
        </span>
        <span className={`text-[64px] font-sans font-black mt-2 leading-none tracking-tight ${
          darkMode ? 'text-white' : 'text-neutral-950'
        }`}>
          {openTasksCount}
        </span>
      </div>

      {/* CARD 2: PLAN THE NEXT DAY */}
      <div 
        onClick={() => setIsPlanningOpen(true)}
        className={`p-6 rounded-[28px] border backdrop-blur-md transition-all duration-300 relative flex flex-col justify-between min-h-[140px] shadow-sm cursor-pointer group/card ${
          darkMode 
            ? 'bg-neutral-900/60 border-white/5 hover:border-red-500/25 hover:bg-neutral-900/80' 
            : 'bg-white/45 border-white hover:border-red-500/40 hover:bg-red-500/[0.03] shadow-[0_8px_32px_0_rgba(230,0,0,0.04)]'
        }`}
      >
        <div className="flex justify-start items-start w-full">
          <Lightbulb className={`text-red-500 shrink-0 ${darkMode ? 'w-9 h-9' : 'w-11 h-11'}`} />
        </div>
        
        <div className="mt-2 flex flex-col justify-end">
          <span className={`text-[16px] md:text-lg font-serif font-black uppercase tracking-tight group-hover/card:text-red-500 transition-colors flex items-center gap-1.5 mt-0.5 ${darkMode ? 'text-white' : 'text-neutral-950'}`}>
            Plan the next day <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover/card:translate-x-1" />
          </span>
        </div>
      </div>

      {/* CARD 3: DONE / TOTAL */}
      <div className={`p-6 rounded-[28px] border backdrop-blur-md transition-all duration-300 relative flex flex-col justify-center min-h-[140px] shadow-sm ${
        darkMode ? 'bg-neutral-900/60 border-white/5' : 'bg-white/45 border-white shadow-[0_8px_32px_0_rgba(230,0,0,0.04)]'
      }`}>
        <span className="text-xs font-semibold text-emerald-500 uppercase tracking-widest font-mono">
          Done / Total
        </span>
        <span className={`text-[52px] font-sans font-black mt-2 leading-none tracking-tight ${
          darkMode ? 'text-white' : 'text-neutral-950'
        }`}>
          {finishedTasksCount}
          <span className={`text-2xl font-mono mx-1.5 ${darkMode ? 'text-neutral-600' : 'text-neutral-500'}`}>/</span>
          <span className={`text-3xl font-mono font-medium ${darkMode ? 'text-neutral-500' : 'text-neutral-600'}`}>{tasks.length}</span>
        </span>
      </div>

      {/* CARD 4: JIGSAW TAG TIME ALLOCATION MAP */}
      <div className={`p-5 rounded-[28px] border backdrop-blur-md transition-all duration-300 relative flex flex-col justify-between overflow-hidden min-h-[140px] shadow-sm ${
        darkMode ? 'bg-neutral-900/60 border-white/5' : 'bg-white/45 border-white shadow-[0_8px_32px_0_rgba(230,0,0,0.04)]'
      }`}>
        <div className="flex items-center justify-between pb-1">
          <span className={`text-[11px] font-bold uppercase tracking-widest font-mono ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Daily Task Breakdown
          </span>
          <div className={`w-1.5 h-1.5 rounded-sm inline-block ${darkMode ? 'bg-neutral-600' : 'bg-neutral-400'}`} />
        </div>

        {tagJigsawTiles.length === 0 ? (
          <div className={`text-[11px] font-mono italic text-center py-4 ${
            darkMode ? 'text-neutral-300' : 'text-neutral-650'
          }`}>
            0% Active Allocation
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 w-full mt-2 select-none overflow-hidden rounded-xl">
            {tagJigsawTiles.map((tile) => (
              <div 
                key={tile.tag}
                style={{ 
                  flexGrow: tile.flexGrow,
                  order: tile.order,
                  width: `calc(${tile.percentage}% - 6px)`,
                  backgroundColor: tile.color
                }}
                className="p-2 rounded-xl text-white flex flex-col justify-between overflow-hidden min-w-[28%] h-[72px] transition-transform duration-200 hover:scale-[1.03] select-none shadow"
                title={`#${tile.tag}: ${tile.hours} hrs (${tile.percentage}%)`}
              >
                <span className="text-[8px] font-mono font-bold leading-none uppercase truncate tracking-tight">#{tile.tag}</span>
                <div className="flex justify-between items-baseline leading-none mt-1">
                  <span className="text-[12px] font-sans font-black">{tile.percentage}%</span>
                  <span className="text-[8px] font-mono opacity-80">{tile.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BentoStats;
