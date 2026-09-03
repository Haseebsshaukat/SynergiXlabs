import { describe, expect, it } from 'vitest';
import { calculateErrorBudget } from './error-budget';

describe('error budget', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, remainingMinutes: 3, budgetMinutes: 4 },
      { organizationId: 'north', projectId: 2, remainingMinutes: 1, budgetMinutes: 2 },
      { organizationId: 'south', projectId: 1, remainingMinutes: 10, budgetMinutes: 10 },
    ];
    expect(calculateErrorBudget(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateErrorBudget([
      { organizationId: 'north', projectId: 1, remainingMinutes: 5, budgetMinutes: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
