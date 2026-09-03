import { describe, expect, it } from 'vitest';
import { calculateEstimateConfidence } from './estimate-confidence';

describe('estimate confidence', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, estimatedItems: 3, totalItems: 4 },
      { organizationId: 'north', projectId: 2, estimatedItems: 1, totalItems: 2 },
      { organizationId: 'south', projectId: 1, estimatedItems: 10, totalItems: 10 },
    ];
    expect(calculateEstimateConfidence(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateEstimateConfidence([
      { organizationId: 'north', projectId: 1, estimatedItems: 5, totalItems: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
