import { describe, expect, it } from 'vitest';
import { calculateRequirementCoverage } from './requirement-coverage';

describe('requirement coverage', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, tracedRequirements: 3, totalRequirements: 4 },
      { organizationId: 'north', projectId: 2, tracedRequirements: 1, totalRequirements: 2 },
      { organizationId: 'south', projectId: 1, tracedRequirements: 10, totalRequirements: 10 },
    ];
    expect(calculateRequirementCoverage(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateRequirementCoverage([
      { organizationId: 'north', projectId: 1, tracedRequirements: 5, totalRequirements: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
