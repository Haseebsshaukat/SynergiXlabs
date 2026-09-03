import { describe, expect, it } from 'vitest';
import { calculateActionClosure } from './action-closure';

describe('action closure', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, closedActions: 3, totalActions: 4 },
      { organizationId: 'north', projectId: 2, closedActions: 1, totalActions: 2 },
      { organizationId: 'south', projectId: 1, closedActions: 10, totalActions: 10 },
    ];
    expect(calculateActionClosure(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateActionClosure([
      { organizationId: 'north', projectId: 1, closedActions: 5, totalActions: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
