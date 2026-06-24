import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSandboxStore } from '../../sandbox/store/sandboxStore.js';
import { getAccessToken } from '../../../lib/auth.util.js';
import type {
  Task,
  TimetableItem,
  GoalTemplate,
  TodoContextType,
  Priority,
  TaskStatus,
} from '../types';
import { isTimeOverlapping } from '../utils/helpers';
import { SlotFactory } from '../utils/SlotFactory';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('libre_dark_mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('libre_dark_mode', String(darkMode));
  }, [darkMode]);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('libre_daily_tasks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((t: any, idx: number) => {
          let timeSlot = t.timeSlot;
          if (!timeSlot) {
            const startH = 8 + ((idx * 2) % 14);
            const endH = startH + (t.hours || 1);
            const pad = (n: number) => String(Math.floor(n)).padStart(2, '0');
            timeSlot = `${pad(startH)}:00 - ${pad(endH)}:00`;
          }
          return {
            ...t,
            hours: t.hours || 1,
            timeSlot,
          };
        });
      } catch (e) {
        console.error('Failed to parse daily tasks', e);
      }
    }
    return [
      {
        id: 't-1',
        title: 'Complete stamina diagnostics',
        priority: 'high',
        tags: ['Onboarding'],
        status: 'concluded',
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        hours: 1.5,
        timeSlot: '08:00 - 09:30',
      },
      {
        id: 't-2',
        title: 'Configure Sandbox columns',
        priority: 'high',
        tags: ['Sandbox'],
        status: 'active',
        createdAt: new Date().toISOString(),
        hours: 1,
        timeSlot: '11:00 - 12:00',
      },
      {
        id: 't-3',
        title: 'Draft telemetry design',
        priority: 'medium',
        tags: ['Design'],
        status: 'active',
        createdAt: new Date().toISOString(),
        hours: 2,
        timeSlot: '13:00 - 15:00',
      },
      {
        id: 't-4',
        title: 'Review digital checkout & triggers',
        priority: 'low',
        tags: ['Integration'],
        status: 'backlog',
        createdAt: new Date().toISOString(),
        hours: 1,
        timeSlot: '15:30 - 16:30',
      },
      {
        id: 't-5',
        title: 'Practice breath control session 2',
        priority: 'low',
        tags: ['Mindfulness'],
        status: 'backlog',
        createdAt: new Date().toISOString(),
        hours: 0.5,
        timeSlot: '17:00 - 17:30',
      },
    ];
  });

  // Timetable
  const [timetable, setTimetable] = useState<TimetableItem[]>(() => {
    const saved = localStorage.getItem('libre_next_day_timetable');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse timetable', e);
      }
    }
    // dummy values
    return [
      {
        id: 'tt-1',
        timeSlot: '08:00 - 09:30',
        activity: 'Strategic Objectives & Focus Inbox',
        category: 'Deep Work',
      },
      {
        id: 'tt-2',
        timeSlot: '10:00 - 11:30',
        activity: 'Backend Core Integration Refinement',
        category: 'Engineering',
      },
      {
        id: 'tt-3',
        timeSlot: '12:00 - 13:00',
        activity: 'Technical Synchronicities & Metrics',
        category: 'Collaboration',
      },
      {
        id: 'tt-4',
        timeSlot: '14:00 - 15:30',
        activity: 'Polishing High Contrast Kanban Boards',
        category: 'Development',
      },
      {
        id: 'tt-5',
        timeSlot: '16:00 - 17:00',
        activity: 'Performance Diagnostics & Outlining Stale Tasks',
        category: 'Review',
      },
    ];
  });

  // Simple state togglers
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [isPlanningOpen, setIsPlanningOpen] = useState<boolean>(false);

  // Axios-based template checking states
  const [apiTemplateNames, setApiTemplateNames] = useState<string[]>([]);
  const [axiosRequestSucceeded, setAxiosRequestSucceeded] = useState<boolean>(false);
  const [mockServerSuccess, setMockServerSuccess] = useState<boolean>(true);

  // Logging modal state
  const [loggingTask, setLoggingTask] = useState<Task | null>(null);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState<boolean>(false);
  const [fetchedTemplate, setFetchedTemplate] = useState<GoalTemplate | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [logFields, setLogFields] = useState<Record<string, string | number>>({});

  const sandboxTables = useSandboxStore((state) => state.tables);

  // Local storage auto synchronization
  useEffect(() => {
    localStorage.setItem('libre_daily_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('libre_next_day_timetable', JSON.stringify(timetable));
  }, [timetable]);

  // Synchronizes and caches task templates in local storage
  const syncTemplatesAndCache = async () => {
    const token = getAccessToken() || 'jwt_secure_access_token_token_abc_123';
    console.log('📤 GET /api/goal-templates - Requesting with access token in headers:', token);

    try {
      const res = await axios.get('/api/goal-templates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('📥 GET /api/goal-templates success response:', res.data);

      let templates: any[] = [];
      if (res.data) {
        if (Array.isArray(res.data)) {
          templates = res.data.map((t: any) => ({
            id: t.id,
            name: t.name,
            description: t.description || '',
            columns: t.columns || [],
            existsOnServer: true,
          }));
        } else if (res.data.name) {
          templates = [
            {
              id: res.data.id || 'goal-default',
              name: res.data.name,
              description: res.data.description || '',
              columns: res.data.columns || [],
              existsOnServer: true,
            },
          ];
        }
      }

      localStorage.setItem('libre_task_templates', JSON.stringify(templates));
      const names = templates.map((t: any) => t.name).filter(Boolean);
      setApiTemplateNames(names);
      setAxiosRequestSucceeded(true);
      return templates;
    } catch (err: any) {
      console.warn(
        '⚠️ GET /api/goal-templates failed or is unreachable. Checking cache/sandbox configuration:',
        err.message,
      );

      // Load from local storage key first if present
      const cached = localStorage.getItem('libre_task_templates');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const names = parsed.map((t: any) => t.name).filter(Boolean);
            setApiTemplateNames(names);
            setAxiosRequestSucceeded(true);
            return parsed;
          }
        } catch (e) {
          console.error('Error reading from cached templates in local storage:', e);
        }
      }

      // Fallback: check Sandbox Zustand tables and save to local storage
      if (sandboxTables.length > 0) {
        const mapped = sandboxTables.map((t) => ({
          id: t.id,
          name: t.name,
          description: t.description || '',
          columns: t.columns || [],
          existsOnServer: false,
        }));
        localStorage.setItem('libre_task_templates', JSON.stringify(mapped));
        const names = mapped.map((t) => t.name);
        setApiTemplateNames(names);
        setAxiosRequestSucceeded(true); // Allow slot matching form tags to select these
        return mapped;
      }
    }

    setApiTemplateNames([]);
    setAxiosRequestSucceeded(false);
    return [];
  };

  // Check goal templates on startup, and synchronized on modifications
  useEffect(() => {
    syncTemplatesAndCache();
  }, [sandboxTables]);

  // Sync templates on expanding quick-add task form or scheduling timetable modal
  useEffect(() => {
    if (showAddForm || isPlanningOpen) {
      syncTemplatesAndCache();
    }
  }, [showAddForm, isPlanningOpen]);

  // Fetch log template when active popup triggers
  useEffect(() => {
    if (loggingTask) {
      setIsFetchingTemplates(true);
      setFetchError(null);
      setFetchedTemplate(null);

      const primaryTag = loggingTask.tags[0] || 'General';

      // Load templates from local storage cached key
      const cached = localStorage.getItem('libre_task_templates');
      let template: any = null;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            template = parsed.find((t: any) => t.name.toLowerCase() === primaryTag.toLowerCase());
          }
        } catch (e) {
          console.error('Error parsing cached templates', e);
        }
      }

      if (template) {
        setIsFetchingTemplates(false);
        setFetchedTemplate(template);

        // Initialize fields based on current template columns
        const fields: Record<string, string | number> = {};
        template.columns.forEach((col: any) => {
          fields[col.id] = ''; // Users can leave optional or fill up as they choose
        });
        setLogFields(fields);
      } else {
        // Not in local cache, let's try calling backend as backup fallback
        const token = getAccessToken() || 'jwt_secure_access_token_token_abc_123';
        console.log(
          `📤 GET /api/goal-templates - Checking server for tag "${primaryTag}" with access token:`,
          token,
        );

        axios
          .get('/api/goal-templates', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data && Array.isArray(res.data)) {
              const matched = res.data.find(
                (t: any) => t.name.toLowerCase() === primaryTag.toLowerCase(),
              );
              if (matched) {
                const mapped = {
                  id: matched.id,
                  name: matched.name,
                  description: matched.description || '',
                  columns: matched.columns || [],
                  existsOnServer: true,
                };
                setFetchedTemplate(mapped);

                const fields: Record<string, string | number> = {};
                mapped.columns.forEach((col: any) => {
                  fields[col.id] = '';
                });
                setLogFields(fields);

                // Update local storage
                try {
                  const currentCache = cached ? JSON.parse(cached) : [];
                  localStorage.setItem(
                    'libre_task_templates',
                    JSON.stringify([...currentCache, mapped]),
                  );
                } catch (e) {}
                return;
              }
            }

            // Treat as non-existent tag
            setFetchedTemplate(null);
            setLogFields({
              notes: '',
              effortName: 5,
              dateFinished: new Date().toISOString().split('T')[0],
            });
          })
          .catch((err) => {
            console.warn(
              `⚠️ GET /api/goal-templates failed during verification of tag "${primaryTag}":`,
              err.message,
            );
            // Treat as custom tag
            setFetchedTemplate(null);
            setLogFields({
              notes: '',
              effortName: 5,
              dateFinished: new Date().toISOString().split('T')[0],
            });
          })
          .finally(() => {
            setIsFetchingTemplates(false);
          });
      }
    }
  }, [loggingTask]);

  // Mutator operations
  const addTask = (params: {
    title: string;
    priority: Priority;
    tagType: 'goal' | 'custom';
    selectedGoalTag: string;
    customTagInput: string;
    startTime: string;
    endTime: string;
  }): boolean => {
    const { title, priority, tagType, selectedGoalTag, customTagInput, startTime, endTime } =
      params;

    if (!title.trim()) {
      triggerToast('Please provide a task title');
      return false;
    }

    if (startTime >= endTime) {
      triggerToast('Error: Start time must be before end time');
      return false;
    }

    const tentativeSlot = `${startTime} - ${endTime}`;
    const hasTaskOverlap = tasks.some((t) => {
      if (!t.timeSlot) return false;
      return isTimeOverlapping(t.timeSlot, tentativeSlot);
    });

    if (hasTaskOverlap) {
      triggerToast('Invalid: This slot overlaps with an existing task schedule');
      return false;
    }

    let tag = 'General';
    if (tagType === 'goal') {
      if (selectedGoalTag === '__CUSTOM_OTHER__') {
        tag = customTagInput.trim() || 'General';
      } else {
        tag = selectedGoalTag || sandboxTables[0]?.name || 'General';
      }
    } else {
      tag = customTagInput.trim() || 'General';
    }

    const newTask = SlotFactory.createTaskSlot({
      title,
      priority,
      tags: [tag],
      status: 'backlog',
      startTime,
      endTime,
    });

    setTasks((prev) => [...prev, newTask]);
    triggerToast('Added focus task with designated timeframe');
    return true;
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    triggerToast('Task discarded from matrix');
  };

  const moveTask = (taskId: string, targetStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    if (task.status === 'concluded') {
      triggerToast('Finished task is locked and cannot be reopened');
      return;
    }

    if (targetStatus === 'concluded') {
      setLoggingTask(task);
      return;
    }

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          if (t.status !== targetStatus) {
            triggerToast(
              `Moved task to ${targetStatus === 'backlog' ? 'Backlog' : 'Active Focus'}`,
            );
          }
          return { ...t, status: targetStatus };
        }
        return t;
      }),
    );
  };

  const addTimetableSlot = (params: {
    startTime: string;
    endTime: string;
    activity: string;
    category: string;
  }): boolean => {
    const { startTime, endTime, activity, category } = params;

    if (!activity.trim()) return false;

    if (startTime >= endTime) {
      triggerToast('Error: Start time must be before end time');
      return false;
    }

    const tentativeSlot = `${startTime} - ${endTime}`;
    const hasTimetableOverlap = timetable.some((item) => {
      return isTimeOverlapping(item.timeSlot, tentativeSlot);
    });

    if (hasTimetableOverlap) {
      triggerToast('Invalid: This slot overlaps with an existing timetable slot');
      return false;
    }

    const newSlot = SlotFactory.createTimetableSlot({
      startTime,
      endTime,
      activity,
      category,
    });

    // POST Axios dispatch
    const slotPayload = {
      timestamp: new Date().toISOString(),
      slot: {
        id: newSlot.id,
        timeSlot: newSlot.timeSlot,
        activity: newSlot.activity,
        category: newSlot.category,
      },
    };

    const token = getAccessToken() || 'jwt_secure_access_token_token_abc_123';
    console.log(
      '📤 POST /api/timetable-slots - Sending payload with accessToken:',
      token,
      slotPayload,
    );

    axios
      .post('/api/timetable-slots', slotPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('📥 POST /api/timetable-slots success response:', res.data);
      })
      .catch((err) => {
        console.warn(
          '⚠️ POST /api/timetable-slots dispatch failed (offline mode fallback):',
          err.message,
        );
      });

    setTimetable((prev) => [...prev, newSlot].sort((a, b) => a.timeSlot.localeCompare(b.timeSlot)));
    triggerToast('Added schedule slot to your next-day timetable');
    return true;
  };

  const deleteTimetableSlot = (id: string) => {
    setTimetable((prev) => prev.filter((item) => item.id !== id));
    triggerToast('Discarded slot from schedule');
  };

  const handleCompleteLogging = () => {
    if (!loggingTask) return;

    const primaryTag = loggingTask.tags[0] || 'General';
    const targetTable =
      sandboxTables.find((t) => t.name.toLowerCase() === primaryTag.toLowerCase()) ||
      sandboxTables.find((t) => t.id === 'default') ||
      sandboxTables[0];

    const loggedRowData: Record<string, string | number> = {};
    const newRow: Record<string, string | number> = {
      id: `row_${Date.now()}`,
    };

    if (fetchedTemplate) {
      // 1. If we have a schema definition (existing tag/template), map variables
      fetchedTemplate.columns.forEach((col: any) => {
        const val = logFields[col.id];
        if (col.type === 'number') {
          // Allow leaving empty or parsing as number
          newRow[col.id] = val !== '' && val !== undefined ? Number(val) : '';
        } else {
          newRow[col.id] = val !== undefined ? String(val) : '';
        }
        loggedRowData[col.name || col.id] = newRow[col.id];
      });

      // Sync with Zustand Store of Sandbox page for targetTable
      if (targetTable) {
        useSandboxStore.setState((state) => {
          const updatedTables = state.tables.map((t) => {
            if (t.id === targetTable.id) {
              return {
                ...t,
                rows: [...t.rows, newRow],
              };
            }
            return t;
          });
          return { tables: updatedTables };
        });
      }
    } else {
      // 2. If it is a non-existent tag (custom/other), allow description-only notes
      if (targetTable) {
        targetTable.columns.forEach((col, idx) => {
          if (idx === 0) {
            newRow[col.id] = logFields.notes || loggingTask.title;
          } else if (col.type === 'number') {
            newRow[col.id] = Number(logFields.effortName) || 5;
          } else if (col.type === 'date') {
            newRow[col.id] = logFields.dateFinished || new Date().toISOString().split('T')[0];
          } else {
            newRow[col.id] = 'Concluded';
          }
          loggedRowData[col.name || col.id] = newRow[col.id];
        });

        // Sync with Sandbox Store row fallback
        useSandboxStore.setState((state) => {
          const updatedTables = state.tables.map((t) => {
            if (t.id === targetTable.id) {
              return {
                ...t,
                rows: [...t.rows, newRow],
              };
            }
            return t;
          });
          return { tables: updatedTables };
        });
      } else {
        // Flat log structure
        loggedRowData['Description'] = logFields.notes || loggingTask.title;
        loggedRowData['Effort Score'] = Number(logFields.effortName) || 5;
        loggedRowData['Finished Date'] =
          logFields.dateFinished || new Date().toISOString().split('T')[0];
      }
    }

    const loggingPayload = {
      timestamp: new Date().toISOString(),
      existsOnServer: fetchedTemplate ? (fetchedTemplate.existsOnServer ?? false) : false,
      task: {
        id: loggingTask.id,
        title: loggingTask.title,
        tags: loggingTask.tags,
        priority: loggingTask.priority,
        estimatedHours: loggingTask.hours,
      },
      table: {
        id: fetchedTemplate?.id || targetTable?.id || 'custom_or_other',
        name: fetchedTemplate?.name || primaryTag,
      },
      payload: loggedRowData,
    };

    const token = getAccessToken() || 'jwt_secure_access_token_token_abc_123';
    console.log(
      '📤 POST /api/goal-logs - Dispatched payload to server with token:',
      token,
      loggingPayload,
    );

    axios
      .post('/api/goal-logs', loggingPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('📥 POST /api/goal-logs success response:', res.data);
      })
      .catch((err) => {
        console.warn(
          '⚠️ POST /api/goal-logs dispatch failed (offline mode fallback or expected sandbox iframe 404):',
          err.message,
        );
      });

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === loggingTask.id) {
          return { ...t, status: 'concluded' };
        }
        return t;
      }),
    );

    setLoggingTask(null);
    triggerToast(
      `Logged to "${fetchedTemplate?.name || targetTable?.name || primaryTag}" & Concluded`,
    );
  };

  return (
    <TodoContext.Provider
      value={{
        darkMode,
        setDarkMode,
        toastMessage,
        triggerToast,
        tasks,
        addTask,
        deleteTask,
        moveTask,
        timetable,
        addTimetableSlot,
        deleteTimetableSlot,
        showAddForm,
        setShowAddForm,
        isPlanningOpen,
        setIsPlanningOpen,
        apiTemplateNames,
        axiosRequestSucceeded,
        mockServerSuccess,
        setMockServerSuccess,
        loggingTask,
        setLoggingTask,
        isFetchingTemplates,
        fetchedTemplate,
        fetchError,
        logFields,
        setLogFields,
        handleCompleteLogging,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
