import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trash2, Clock } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { getTagRedHSL } from '../utils/helpers';

const TimetableModal: React.FC = () => {
  const {
    darkMode,
    isPlanningOpen,
    setIsPlanningOpen,
    timetable,
    addTimetableSlot,
    deleteTimetableSlot,
    apiTemplateNames,
    axiosRequestSucceeded,
    triggerToast
  } = useTodo();

  const [activity, setActivity] = useState('');
  const [timeStart, setTimeStart] = useState('08:00');
  const [timeEnd, setTimeEnd] = useState('09:00');
  const [selectedCategoryTag, setSelectedCategoryTag] = useState('');
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (apiTemplateNames.length > 0) {
      setSelectedCategoryTag(apiTemplateNames[0]);
    }
  }, [apiTemplateNames]);

  if (!isPlanningOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let slotCategory = 'General';
    if (axiosRequestSucceeded) {
      if (selectedCategoryTag === '__CUSTOM_OTHER__') {
        slotCategory = customCategoryInput.trim() || 'General';
      } else {
        slotCategory = selectedCategoryTag || apiTemplateNames[0] || 'General';
      }
    } else {
      slotCategory = category.trim() || 'General';
    }

    const success = addTimetableSlot({
      startTime: timeStart,
      endTime: timeEnd,
      activity,
      category: slotCategory
    });

    if (success) {
      setActivity('');
      setCustomCategoryInput('');
      setCategory('');
      setTimeStart('08:00');
      setTimeEnd('09:00');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay with blur effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsPlanningOpen(false)}
          className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className={`w-full max-w-2xl rounded-[32px] border p-6 md:p-8 shadow-2xl relative overflow-hidden z-10 max-h-[90vh] flex flex-col justify-between ${
            darkMode 
              ? 'bg-neutral-900 border-white/5 text-white' 
              : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-200/50'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                <Calendar className="w-5.5 h-5.5 text-red-500" />
                Plan the Next Day
              </h3>
              <p className={`text-xs font-mono font-medium mt-1 uppercase tracking-wider ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Design your tactical timetable template for tomorrow
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPlanningOpen(false)}
              className={`p-1.5 text-lg font-bold leading-none hover:opacity-80 transition-opacity cursor-pointer ${
                darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Close schedule planner"
            >
              ✕
            </button>
          </div>

          {/* Middle section: list and input */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-6 max-h-[50vh] scrollbar-thin">
            
            {/* AI Refine Row */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all duration-300 ${
              darkMode ? 'bg-neutral-950/50 border-white/5 hover:border-white/10' : 'bg-neutral-50 border-neutral-200/80 hover:border-neutral-300'
            }`}>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider font-mono">
                  AI Schedule Refinement
                </h4>
                <p className={`text-[11px] font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-650'}`}>
                  Optimize focus intervals, prevent burnout, & check task balance.
                </p>
              </div>
              <button
                type="button"
                onClick={() => triggerToast("All future intervals are optimized & balanced.")}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md cursor-pointer border whitespace-nowrap ${
                  darkMode 
                    ? 'bg-red-650 text-white border-transparent hover:scale-105' 
                    : 'bg-white text-black border-neutral-300/80 hover:bg-neutral-100 hover:scale-105'
                }`}
              >
                Refine with AI
              </button>
            </div>

            {/* Create New Slot Form */}
            <form 
              onSubmit={handleSubmit} 
              className={`p-3 rounded-2xl border border-dashed text-xs space-y-2.5 mb-4 ${
                darkMode 
                  ? 'border-neutral-800 bg-neutral-950/40 text-white' 
                  : 'border-neutral-300 bg-[#f8fafc]/90 text-neutral-900 shadow-inner'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase text-red-500">Plan Next-Day Schedule Slot</span>
                <div className="w-2 h-2 bg-red-500 rounded-sm" />
              </div>
              
              <input
                type="text"
                required
                placeholder="Enlist tomorrow's target/activity..."
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className={`w-full border focus:border-red-500/50 rounded-xl px-2.5 py-1.5 text-xs outline-none transition-all placeholder-neutral-400 ${
                  darkMode 
                    ? 'bg-black/20 border-neutral-800 text-white' 
                    : 'bg-white border-neutral-300 text-neutral-900'
                }`}
              />
              
              {/* From to schedule selecting slot configuration */}
              <div className="flex flex-col gap-1 pt-1">
                <span className={`text-[9px] font-mono uppercase font-bold tracking-wider ${
                  darkMode ? 'text-neutral-400' : 'text-neutral-650'
                }`}>
                  Schedule Slot
                </span>
                <div className="flex items-center gap-1.5">
                  <div className={`flex-1 flex items-center border rounded-lg px-2 py-1 ${
                    darkMode 
                      ? 'bg-neutral-900 border-neutral-800' 
                      : 'bg-neutral-50 border-neutral-300'
                  }`}>
                    <span className={`text-[9px] font-mono mr-1 uppercase ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>From:</span>
                    <input
                      type="time"
                      required
                      value={timeStart}
                      onChange={(e) => setTimeStart(e.target.value || '08:00')}
                      className={`w-full bg-transparent text-[10px] font-bold font-mono outline-none ${darkMode ? 'text-white' : 'text-neutral-900'}`}
                    />
                  </div>
                  <div className={`flex-1 flex items-center border rounded-lg px-2 py-1 ${
                    darkMode 
                      ? 'bg-neutral-950 border-neutral-800' 
                      : 'bg-neutral-50 border-neutral-300'
                  }`}>
                    <span className={`text-[9px] font-mono mr-1 uppercase ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>To:</span>
                    <input
                      type="time"
                      required
                      value={timeEnd}
                      onChange={(e) => setTimeEnd(e.target.value || '09:00')}
                      className={`w-full bg-transparent text-[10px] font-bold font-mono outline-none ${darkMode ? 'text-white' : 'text-neutral-900'}`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-neutral-300/30">
                <div className="flex gap-1 items-center">
                  <span className={`text-[9px] font-mono uppercase tracking-wider font-bold ${
                    darkMode ? 'text-neutral-400' : 'text-neutral-650'
                  }`}>
                    Category:
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 select-none">
                  {axiosRequestSucceeded ? (
                    <div className="flex items-center gap-1.5">
                      <select
                        value={selectedCategoryTag}
                        onChange={(e) => {
                          setSelectedCategoryTag(e.target.value);
                        }}
                        className={`text-[9.5px] font-mono font-bold outline-none rounded p-0.5 max-w-[130px] ${
                          darkMode 
                            ? 'bg-neutral-900 border border-neutral-800 text-neutral-300 focus:text-white' 
                            : 'bg-neutral-50 border border-neutral-200 text-neutral-700 focus:text-neutral-900'
                        }`}
                      >
                        {apiTemplateNames.map(name => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                        <option value="__CUSTOM_OTHER__">Others</option>
                      </select>

                      {selectedCategoryTag === '__CUSTOM_OTHER__' && (
                        <input
                          type="text"
                          maxLength={20}
                          placeholder="Name category..."
                          value={customCategoryInput}
                          onChange={(e) => {
                            setCustomCategoryInput(e.target.value);
                          }}
                          className={`w-24 bg-transparent text-[9.5px] text-right font-mono border-b outline-none placeholder-neutral-400 font-bold transition-colors ${
                            darkMode 
                              ? 'text-neutral-350 border-neutral-800 focus:border-red-500/40 focus:text-white' 
                              : 'text-neutral-600 border-neutral-200 focus:border-red-500/40 focus:text-neutral-900'
                          }`}
                        />
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="e.g. Deep Work"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`w-32 bg-transparent text-[9px] text-right font-mono border-0 border-b border-neutral-205 focus:border-red-550/40 outline-none placeholder-neutral-400 font-bold ${
                        darkMode 
                          ? 'text-neutral-400 border-neutral-800 focus:text-white' 
                          : 'text-neutral-650 border-neutral-300 focus:text-neutral-900'
                      }`}
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className="p-1 px-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-mono text-[9px] font-black uppercase tracking-wider transition-colors inline-flex items-center justify-center cursor-pointer shadow-sm"
                >
                  Enlist
                </button>
              </div>
            </form>

            {/* List of Scheduled Items */}
            <div className="space-y-2 mt-4 font-normal">
              <div className="flex items-center justify-between">
                <h4 className={`text-xs font-bold font-mono uppercase tracking-wider ${
                  darkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  Active Timetable Schedule ({timetable.length})
                </h4>
              </div>
              
              {timetable.length === 0 ? (
                <div className={`p-8 rounded-2xl border border-dashed text-center ${
                  darkMode ? 'border-white/5 text-neutral-500' : 'border-neutral-300 bg-neutral-50/50 text-neutral-600'
                }`}>
                  <Clock className={`w-8 h-8 mx-auto stroke-[1.5] mb-2 ${darkMode ? 'text-neutral-650' : 'text-neutral-500'}`} />
                  <p className="text-xs font-mono font-bold">No slots scheduled yet</p>
                  <p className={`text-[10.5px] mt-1 ${darkMode ? 'text-neutral-450' : 'text-neutral-500'}`}>Fill the inputs above to design your day</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {timetable.map((item) => (
                    <div 
                      key={item.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                        darkMode ? 'bg-neutral-950 border-white/5 hover:border-red-500/10' : 'bg-[#fcfdfe] border-neutral-200 hover:border-neutral-300 shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                        <span className={`text-xs font-mono font-bold shrink-0 select-none ${
                          darkMode ? 'text-red-400' : 'text-red-750'
                        }`}>
                          {item.timeSlot}
                        </span>
                        
                        <span className={`hidden sm:inline ${darkMode ? 'text-neutral-700' : 'text-neutral-300'}`}>•</span>
                        
                        <span className={`text-xs font-bold truncate flex-1 leading-snug ${
                          darkMode ? 'text-neutral-100' : 'text-neutral-900'
                        }`}>
                          {item.activity}
                        </span>

                        <span 
                          style={{ color: getTagRedHSL(item.category, darkMode, true) }} 
                          className="text-[10.5px] font-mono font-black uppercase shrink-0"
                        >
                          #{item.category}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteTimetableSlot(item.id)}
                        className={`text-neutral-400 hover:text-red-500 transition-colors p-1.5 rounded-lg cursor-pointer ${
                          darkMode ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100'
                        }`}
                        title="Delete timetable block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Footer buttons */}
          <div className={`mt-6 pt-4 border-t flex justify-end gap-3 ${
            darkMode ? 'border-white/5' : 'border-neutral-150'
          }`}>
            <button
              type="button"
              onClick={() => setIsPlanningOpen(false)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md border ${
                darkMode 
                  ? 'bg-red-650 border-transparent hover:bg-white text-white hover:text-black hover:border-white hover:scale-105' 
                  : 'bg-black border-transparent hover:bg-neutral-800 text-white hover:scale-105'
              }`}
            >
              Solidify Tomorrow's Schedule
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TimetableModal;
