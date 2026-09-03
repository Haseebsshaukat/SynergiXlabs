import { describe, expect, it } from 'vitest';
import { calculateLeadTimeTarget } from './lead-time-target';

describe('lead time target', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, itemsWithinTarget: 3, totalItems: 4 },
      { organizationId: 'north', projectId: 2, itemsWithinTarget: 1, totalItems: 2 },
      { organizationId: 'south', projectId: 1, itemsWithinTarget: 10, totalItems: 10 },
    ];
    expect(calculateLeadTimeTarget(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateLeadTimeTarget([
      { organizationId: 'north', projectId: 1, itemsWithinTarget: 5, totalItems: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
