import type { SandboxTable, SandboxColumn } from '../types/sandbox.types';

export const INITIAL_TABLE_TEMPLATES: SandboxTable[] = [];

export interface PresetData {
  description: string;
  columns: SandboxColumn[];
  rows: Record<string, string | number>[];
}

export const GET_PRESET_TEMPLATES = (type: 'goal' | 'progress' | 'logging'): PresetData => {
  if (type === 'goal') {
    return {
      description: 'Goal milestones with target completion dates.',
      columns: [
        { id: 'item', name: 'Milestone Task', type: 'text', isTracked: false },
        { id: 'target_date', name: 'Target Date', type: 'date', isTracked: false },
        { id: 'actual_finish_date', name: 'Actual Finish Date', type: 'date', isTracked: true }
      ],
      rows: [
        { id: 'row1', item: 'Define project MVP scope', target_date: '2026-06-15', actual_finish_date: '2026-06-14' },
        { id: 'row2', item: 'Assemble high-fidelity canvas design', target_date: '2026-06-25', actual_finish_date: '2026-06-24' },
        { id: 'row3', item: 'Publish production build sandbox', target_date: '2026-07-01', actual_finish_date: '2026-06-30' }
      ]
    };
  } else if (type === 'progress') {
    return {
      description: 'Progress tracker monitoring numeric statistics over time.',
      columns: [
        { id: 'day', name: 'Period Day', type: 'text', isTracked: false },
        { id: 'milestone', name: 'Milestone Name', type: 'text', isTracked: false },
        { id: 'value', name: 'Metric Value', type: 'number', isTracked: true },
        { id: 'improvement', name: 'Improvement %', type: 'number', isTracked: true }
      ],
      rows: [
        { id: 'row1', day: 'Week 1', milestone: 'Set baseline metric', value: 42, improvement: 0 },
        { id: 'row2', day: 'Week 2', milestone: 'Refined algorithms', value: 68, improvement: 62 },
        { id: 'row3', day: 'Week 3', milestone: 'Scaled server clusters', value: 95, improvement: 40 }
      ]
    };
  } else {
    return {
      description: 'Chronological text log recording events.',
      columns: [
        { id: 'timestamp', name: 'Date Time', type: 'date', isTracked: true },
        { id: 'event', name: 'Log Event Message', type: 'text', isTracked: false },
        { id: 'category', name: 'Category Tag', type: 'text', isTracked: false }
      ],
      rows: [
        { id: 'row1', timestamp: '2026-06-08', event: 'Database sync initialized', category: 'System' },
        { id: 'row2', timestamp: '2026-06-08', event: 'Refined visual layout margins', category: 'UI' }
      ]
    };
  }
};
