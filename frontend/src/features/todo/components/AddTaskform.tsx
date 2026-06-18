import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodo } from '../context/TodoContext';
import type { Priority } from '../types';
import { calculateHoursBetween } from '../utils/helpers';

const AddTaskForm: React.FC = () => {
  const {
    darkMode,
    showAddForm,
    setShowAddForm,
    apiTemplateNames,
    axiosRequestSucceeded,
    addTask
  } = useTodo();

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [tagType, setTagType] = useState<'goal' | 'custom'>('goal');
  const [selectedGoalTag, setSelectedGoalTag] = useState<string>('');
  const [customTagInput, setCustomTagInput] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('10:00');

  useEffect(() => {
    if (apiTemplateNames.length > 0) {
      setSelectedGoalTag(apiTemplateNames[0]);
      setTagType('goal');
    } else {
      setTagType('custom');
    }
  }, [apiTemplateNames]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = addTask({
      title,
      priority,
      tagType,
      selectedGoalTag,
      customTagInput,
      startTime,
      endTime
    });

    if (success) {
      setTitle('');
      setCustomTagInput('');
      setPriority('medium');
      setStartTime('09:00');
      setEndTime('10:00');
      setShowAddForm(false);
    }
  };

  return (
    <AnimatePresence initial={false}>
      {showAddForm && (
        <motion.div
          id="libre-add-task-form"
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden shrink-0"
        >
          <form 
            onSubmit={handleSubmit} 
            className={`p-3 rounded-2xl border border-dashed text-xs space-y-2.5 mb-2 ${
              darkMode 
                ? 'border-neutral-800 bg-neutral-950/40 text-white' 
                : 'border-neutral-300 bg-[#f8fafc]/90 text-neutral-900 shadow-inner'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold uppercase text-red-500">Quick Add Task</span>
              <div className="w-2 h-2 bg-red-500 rounded-sm" />
            </div>
            
            <input
              type="text"
              required
              placeholder="Enlist target title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border focus:border-red-500/50 rounded-xl px-2.5 py-1.5 text-xs outline-none transition-all placeholder-neutral-400 ${
                darkMode 
                  ? 'bg-black/20 border-neutral-800 text-white' 
                  : 'bg-white border-neutral-300 text-neutral-900'
              }`}
            />
            
            <div className="flex flex-col gap-1 pt-1">
              <span className={`text-[9px] font-mono uppercase font-bold tracking-wider ${
                darkMode ? 'text-neutral-400' : 'text-neutral-600'
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
                    value={startTime}
                    onChange={(e) => {
                      const val = e.target.value || '09:00';
                      setStartTime(val);
                    }}
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
                    value={endTime}
                    onChange={(e) => {
                      const val = e.target.value || '10:00';
                      setEndTime(val);
                    }}
                    className={`w-full bg-transparent text-[10px] font-bold font-mono outline-none ${darkMode ? 'text-white' : 'text-neutral-900'}`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 border-t border-neutral-300/30">
              <div className="flex gap-1 items-center">
                {(['low', 'medium', 'high'] as const).map(prio => (
                  <button
                    key={prio}
                    type="button"
                    onClick={() => setPriority(prio)}
                    className={`w-3 h-3 rounded-full border transition-all ${
                      priority === prio
                        ? prio === 'high' 
                          ? 'bg-red-600 border-red-700 scale-110' 
                          : prio === 'medium' 
                            ? 'bg-amber-500 border-amber-600 scale-110' 
                            : 'bg-neutral-500 border-neutral-600 scale-110'
                        : `border-transparent hover:scale-105 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-200'}`
                    }`}
                    title={`Priority: ${prio}`}
                  />
                ))}
                <span className={`text-[8px] font-mono uppercase tracking-wider ml-1 font-bold ${
                  darkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  Prio
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 select-none">
                {axiosRequestSucceeded ? (
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[8px] font-mono uppercase tracking-wider font-bold p-0.5 px-1.5 rounded ${
                      darkMode ? 'bg-neutral-800 text-red-400' : 'bg-neutral-100 text-red-650'
                    }`}>
                      Matched Goal
                    </span>
                    <select
                      value={selectedGoalTag}
                      onChange={(e) => {
                        setSelectedGoalTag(e.target.value);
                        setTagType('goal');
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

                    {selectedGoalTag === '__CUSTOM_OTHER__' && (
                      <input
                        type="text"
                        maxLength={20}
                        placeholder="Name it..."
                        value={customTagInput}
                        onChange={(e) => {
                          setCustomTagInput(e.target.value);
                          setTagType('goal');
                        }}
                        className={`w-20 bg-transparent text-[9.5px] text-right font-mono border-b outline-none placeholder-neutral-400 font-bold transition-colors ${
                          darkMode 
                            ? 'text-neutral-300 border-neutral-800 focus:border-red-500/40 focus:text-white' 
                            : 'text-neutral-600 border-neutral-200 focus:border-red-500/40 focus:text-neutral-900'
                        }`}
                      />
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="Add tag..."
                    value={customTagInput}
                    onChange={(e) => {
                      setCustomTagInput(e.target.value);
                      setTagType('custom');
                    }}
                    className={`w-20 bg-transparent text-[9.5px] text-right font-mono border-b outline-none placeholder-neutral-400 font-bold transition-colors ${
                      darkMode 
                        ? 'text-neutral-300 border-neutral-800 focus:border-red-500/40 focus:text-white' 
                        : 'text-neutral-600 border-neutral-200 focus:border-red-500/40 focus:text-neutral-900'
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTaskForm;
