import type { Task, TimetableItem, Priority, TaskStatus } from '../types.js';
import { calculateHoursBetween } from './helpers.js';

/**
 * SlotFactory implements the Factory Method design pattern to manage 
 * all slot/schedule creation logic inside the application.
 */
export class SlotFactory {
  /**
   * Factory Method: Creates a structured Task slot
   */
  static createTaskSlot(params: {
    title: string;
    priority: Priority;
    tags: string[];
    status: TaskStatus;
    startTime: string;
    endTime: string;
  }): Task {
    const tentativeSlot = `${params.startTime} - ${params.endTime}`;
    const hours = calculateHoursBetween(params.startTime, params.endTime);

    return {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: params.title.trim(),
      priority: params.priority,
      tags: params.tags,
      status: params.status,
      createdAt: new Date().toISOString(),
      hours: Math.max(0.25, hours),
      timeSlot: tentativeSlot
    };
  }

  /**
   * Factory Method: Creates a next-day Timetable slot
   */
  static createTimetableSlot(params: {
    startTime: string;
    endTime: string;
    activity: string;
    category: string;
  }): TimetableItem {
    const tentativeSlot = `${params.startTime} - ${params.endTime}`;
    
    return {
      id: `tt-${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timeSlot: tentativeSlot,
      activity: params.activity.trim(),
      category: params.category.trim()
    };
  }
}
