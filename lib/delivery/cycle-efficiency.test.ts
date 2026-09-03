import { describe, expect, it } from 'vitest';
import { calculateCycleEfficiency } from './cycle-efficiency';

describe('cycle efficiency', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, activeDays: 3, totalDays: 4 },
      { organizationId: 'north', projectId: 2, activeDays: 1, totalDays: 2 },
      { organizationId: 'south', projectId: 1, activeDays: 10, totalDays: 10 },
    ];
    expect(calculateCycleEfficiency(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateCycleEfficiency([
      { organizationId: 'north', projectId: 1, activeDays: 5, totalDays: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
