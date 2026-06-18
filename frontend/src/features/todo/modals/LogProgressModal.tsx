import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodo } from '../context/TodoContext';

const LogProgressModal: React.FC = () => {
  const {
    darkMode,
    loggingTask,
    setLoggingTask,
    isFetchingTemplates,
    fetchedTemplate,
    fetchError,
    logFields,
    setLogFields,
    handleCompleteLogging
  } = useTodo();

  if (!loggingTask) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className={`w-full max-w-xl rounded-[28px] border p-6 flex flex-col gap-5 ${
            darkMode ? 'bg-neutral-900 border-white/10 text-white' : 'bg-white border-neutral-300 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.15)] text-neutral-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-black text-xl uppercase tracking-tight text-red-500">
                Mission Log Entry
              </h3>
              <p className={`text-[10px] font-mono uppercase tracking-widest font-black mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Conclude: {loggingTask.title}
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => setLoggingTask(null)}
              className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-mono font-bold transition-all border shrink-0 hover:rotate-90 cursor-pointer ${
                darkMode 
                  ? 'border-white/10 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-50/40' 
                  : 'border-neutral-300 bg-neutral-50 text-neutral-500 hover:text-black hover:border-neutral-400'
              }`}
              title="Close popup & cancel"
            >
              ✕
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto max-h-[40vh] pr-1 space-y-4">
            {isFetchingTemplates ? (
              <div className="text-center py-6 text-xs font-mono text-neutral-500">
                Contacting table catalogs...
              </div>
            ) : fetchError ? (
              <div className="text-center py-4 text-xs font-mono text-red-500 bg-red-500/5 rounded-xl border border-red-500/15">
                {fetchError}
              </div>
            ) : fetchedTemplate ? (
              <div className="space-y-4 pt-1">
                <div className="space-y-3.5">
                  {fetchedTemplate.columns.map((col: any) => {
                    const val = logFields[col.id] ?? '';
                    return (
                      <div key={col.id} className="flex flex-col gap-1.5">
                        <label className={`text-[10px] font-mono uppercase font-bold tracking-wider ${darkMode ? 'text-neutral-400' : 'text-neutral-650'}`}>
                          {col.name} <span className="text-neutral-450 text-[9px] lowercase font-normal">(optional)</span>
                        </label>
                        
                        {col.type === 'number' ? (
                          <input
                            type="number"
                            value={val}
                            onChange={(e) => setLogFields(prev => ({ ...prev, [col.id]: e.target.value }))}
                            className={`w-full border rounded-xl px-3 py-2 text-xs outline-none transition-all placeholder-neutral-400 font-bold ${
                              darkMode 
                                ? 'bg-black/20 focus:border-red-500/50 border-neutral-800 text-white' 
                                : 'bg-white focus:border-red-500/40 border-neutral-200 text-neutral-900'
                            }`}
                          />
                        ) : col.type === 'date' ? (
                          <input
                            type="date"
                            value={val}
                            onChange={(e) => setLogFields(prev => ({ ...prev, [col.id]: e.target.value }))}
                            className={`w-full border rounded-xl px-3 py-2 text-xs outline-none transition-all placeholder-neutral-400 font-mono font-bold ${
                              darkMode 
                                ? 'bg-black/20 focus:border-red-500/50 border-neutral-800 text-white dark-date-picker' 
                                : 'bg-white focus:border-red-500/40 border-neutral-200 text-neutral-900'
                            }`}
                          />
                        ) : (
                          <input
                            type="text"
                            placeholder="Enter log detail (optional)..."
                            value={val}
                            onChange={(e) => setLogFields(prev => ({ ...prev, [col.id]: e.target.value }))}
                            className={`w-full border rounded-xl px-3 py-2 text-xs outline-none transition-all placeholder-neutral-400 font-bold ${
                              darkMode 
                                ? 'bg-black/20 focus:border-red-500/50 border-neutral-800 text-white' 
                                : 'bg-white focus:border-red-500/40 border-neutral-200 text-neutral-900'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                <div className="space-y-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className={`text-[10px] font-mono uppercase font-bold tracking-wider ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      Summary of Accomplishment <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={logFields.notes ?? ''}
                      placeholder="Provide a quick overview of what you achieved..."
                      onChange={(e) => setLogFields(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className={`w-full border rounded-xl px-3 py-2 text-xs outline-none transition-all placeholder-neutral-400 leading-relaxed font-bold ${
                        darkMode 
                          ? 'bg-black/20 focus:border-red-500/50 border-neutral-800 text-white' 
                          : 'bg-white focus:border-red-500/40 border-neutral-200 text-neutral-900'
                      }`}
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className={`text-[10px] font-mono uppercase font-bold tracking-wider ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        Effort Score (1-10)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        required
                        value={logFields.effortName ?? 5}
                        onChange={(e) => setLogFields(prev => ({ ...prev, effortName: e.target.value }))}
                        className={`w-full border rounded-xl px-3 py-2 text-xs outline-none transition-all placeholder-neutral-400 font-bold ${
                          darkMode 
                            ? 'bg-black/20 focus:border-red-500/50 border-neutral-800 text-white' 
                            : 'bg-white focus:border-red-500/40 border-neutral-200 text-neutral-900'
                        }`}
                      />
                    </div>

                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className={`text-[10px] font-mono uppercase font-bold tracking-wider ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        Concluded Date
                      </label>
                      <input
                        type="date"
                        required
                        value={logFields.dateFinished ?? ''}
                        onChange={(e) => setLogFields(prev => ({ ...prev, dateFinished: e.target.value }))}
                        className={`w-full border rounded-xl px-3 py-2 text-xs outline-none transition-all placeholder-neutral-400 font-mono font-bold ${
                          darkMode 
                            ? 'bg-black/20 focus:border-red-500/50 border-neutral-800 text-white dark-date-picker' 
                            : 'bg-white focus:border-red-500/40 border-neutral-200 text-neutral-900'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className={`pt-4 border-t flex justify-end gap-3 ${
            darkMode ? 'border-white/5' : 'border-neutral-150'
          }`}>
            <button
              type="button"
              onClick={() => setLoggingTask(null)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all border cursor-pointer ${
                darkMode 
                  ? 'bg-neutral-800 border-white/5 hover:bg-neutral-700 text-neutral-300' 
                  : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-600'
              }`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCompleteLogging}
              className={`px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:scale-105 border ${
                darkMode 
                  ? 'bg-red-650 border-transparent hover:bg-white text-white hover:text-black hover:border-white' 
                  : 'bg-black border-transparent hover:bg-neutral-800 text-white'
              }`}
            >
              Complete & Save Log Rows
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogProgressModal;
