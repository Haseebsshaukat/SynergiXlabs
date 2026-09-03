import { describe, expect, it } from 'vitest';
import { calculateCloudBudgetEfficiency } from './cloud-budget-efficiency';

describe('cloud budget efficiency', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, optimizedServices: 3, totalServices: 4 },
      { organizationId: 'north', projectId: 2, optimizedServices: 1, totalServices: 2 },
      { organizationId: 'south', projectId: 1, optimizedServices: 10, totalServices: 10 },
    ];
    expect(calculateCloudBudgetEfficiency(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateCloudBudgetEfficiency([
      { organizationId: 'north', projectId: 1, optimizedServices: 5, totalServices: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
