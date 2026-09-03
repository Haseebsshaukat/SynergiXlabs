import { describe, expect, it } from 'vitest';
import { calculateScopeStability } from './scope-stability';

describe('scope stability', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, unchangedRequirements: 3, totalRequirements: 4 },
      { organizationId: 'north', projectId: 2, unchangedRequirements: 1, totalRequirements: 2 },
      { organizationId: 'south', projectId: 1, unchangedRequirements: 10, totalRequirements: 10 },
    ];
    expect(calculateScopeStability(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateScopeStability([
      { organizationId: 'north', projectId: 1, unchangedRequirements: 5, totalRequirements: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
