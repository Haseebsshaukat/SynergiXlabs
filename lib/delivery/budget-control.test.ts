import { describe, expect, it } from 'vitest';
import { calculateBudgetControl } from './budget-control';

describe('budget control', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, controlledSpend: 3, totalSpend: 4 },
      { organizationId: 'north', projectId: 2, controlledSpend: 1, totalSpend: 2 },
      { organizationId: 'south', projectId: 1, controlledSpend: 10, totalSpend: 10 },
    ];
    expect(calculateBudgetControl(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateBudgetControl([
      { organizationId: 'north', projectId: 1, controlledSpend: 5, totalSpend: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
