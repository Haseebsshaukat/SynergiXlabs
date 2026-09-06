import { describe, expect, it } from 'vitest';
import { calculateTechnicalDebtRetirement } from './technical-debt-retirement';

describe('technical debt retirement', () => {
  it('aggregates only records in the requested scope', () => {
    expect(calculateTechnicalDebtRetirement([{ organizationId: 'north', projectId: 1, retiredItems: 3, plannedItems: 4 }, { organizationId: 'north', projectId: 2, retiredItems: 1, plannedItems: 2 }, { organizationId: 'south', projectId: 1, retiredItems: 10, plannedItems: 10 }], 'north', 1))
      .toEqual({ percentage: 75, sampleSize: 1 });
  });
  it('rejects achieved values above their total', () => {
    expect(() => calculateTechnicalDebtRetirement([{ organizationId: 'north', projectId: 1, retiredItems: 5, plannedItems: 4 }], 'north', 1)).toThrow('invalid');
  });
});
