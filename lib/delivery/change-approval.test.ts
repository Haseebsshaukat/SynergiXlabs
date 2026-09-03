import { describe, expect, it } from 'vitest';
import { calculateChangeApproval } from './change-approval';

describe('change approval', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, decidedChanges: 3, totalChanges: 4 },
      { organizationId: 'north', projectId: 2, decidedChanges: 1, totalChanges: 2 },
      { organizationId: 'south', projectId: 1, decidedChanges: 10, totalChanges: 10 },
    ];
    expect(calculateChangeApproval(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateChangeApproval([
      { organizationId: 'north', projectId: 1, decidedChanges: 5, totalChanges: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
