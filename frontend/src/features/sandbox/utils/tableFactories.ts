import type {
  SandboxTable
} from '../types/sandbox.types'

import {
  createNewRowId
} from './tableMutations'

export const MAX_ROWS = 10
export const MAX_COLS = 5

export const createDefaultTable =
  (): SandboxTable => ({
    id: `db_${Date.now()}`,

    name: 'default',

    description:
      'Default matrix sheet.',

    columns: [
      {
        id: 'item',
        name: 'Item',
        type: 'text',
        isTracked: false
      },

      {
        id: 'value',
        name: 'Value',
        type: 'number',
        isTracked: true
      }
    ],

    rows: [
      {
        id: createNewRowId(),
        item: 'Initial Target',
        value: 100
      }
    ]
  })

export const createGoalTable =
  (
    name: string,
    description: string
  ): SandboxTable => ({
    id: `db_${Date.now()}`,

    name,

    description:
      description.trim()
      || 'Custom goal matrix.',

    columns: [
      {
        id: 'goal',
        name: 'Goal Milestone',
        type: 'text',
        isTracked: false
      },

      {
        id: 'metric',
        name: 'Target Value',
        type: 'number',
        isTracked: true
      }
    ],

    rows: [
      {
        id: createNewRowId(),
        goal: 'Phase 1',
        metric: 10
      }
    ]
  })
