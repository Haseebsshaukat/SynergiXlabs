import { describe, expect, it } from 'vitest';
import { calculateDecisionClosure } from './decision-closure';

describe('decision closure', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, closedDecisions: 3, totalDecisions: 4 },
      { organizationId: 'north', projectId: 2, closedDecisions: 1, totalDecisions: 2 },
      { organizationId: 'south', projectId: 1, closedDecisions: 10, totalDecisions: 10 },
    ];
    expect(calculateDecisionClosure(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateDecisionClosure([
      { organizationId: 'north', projectId: 1, closedDecisions: 5, totalDecisions: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
