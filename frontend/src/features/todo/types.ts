import React from 'react';

export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'backlog' | 'active' | 'concluded';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  tags: string[];
  status: TaskStatus;
  createdAt: string;
  hours: number;
  timeSlot?: string;
}

export interface TimetableItem {
  id: string;
  timeSlot: string;
  activity: string;
  category: string;
}

export interface GoalTemplateColumn {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date';
  isTracked: boolean;
}

export interface GoalTemplate {
  id: string;
  name: string;
  description: string;
  columns: GoalTemplateColumn[];
  existsOnServer: boolean;
}

export interface TodoContextType {
  // Theme
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;

  // Toast System
  toastMessage: string | null;
  triggerToast: (msg: string) => void;

  // Kanban tasks
  tasks: Task[];
  addTask: (params: {
    title: string;
    priority: Priority;
    tagType: 'goal' | 'custom';
    selectedGoalTag: string;
    customTagInput: string;
    startTime: string;
    endTime: string;
  }) => boolean;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, targetStatus: TaskStatus) => void;

  // Timetable
  timetable: TimetableItem[];
  addTimetableSlot: (params: {
    startTime: string;
    endTime: string;
    activity: string;
    category: string;
  }) => boolean;
  deleteTimetableSlot: (id: string) => void;

  // Add Task Collapse Form State
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;

  // Timetable Side Panel State
  isPlanningOpen: boolean;
  setIsPlanningOpen: (open: boolean) => void;

  // Goal template server queries
  apiTemplateNames: string[];
  axiosRequestSucceeded: boolean;
  mockServerSuccess: boolean;
  setMockServerSuccess: (success: boolean) => void;

  // Task logging state / concluding popup
  loggingTask: Task | null;
  setLoggingTask: (task: Task | null) => void;
  isFetchingTemplates: boolean;
  fetchedTemplate: GoalTemplate | null;
  fetchError: string | null;
  logFields: Record<string, string | number>;
  setLogFields: React.Dispatch<React.SetStateAction<Record<string, string | number>>>;
  handleCompleteLogging: () => void;
}
