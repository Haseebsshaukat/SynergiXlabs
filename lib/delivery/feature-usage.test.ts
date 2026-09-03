import { describe, expect, it } from 'vitest';
import { calculateFeatureUsage } from './feature-usage';

describe('feature usage', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, engagedUsers: 3, activeUsers: 4 },
      { organizationId: 'north', projectId: 2, engagedUsers: 1, activeUsers: 2 },
      { organizationId: 'south', projectId: 1, engagedUsers: 10, activeUsers: 10 },
    ];
    expect(calculateFeatureUsage(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateFeatureUsage([
      { organizationId: 'north', projectId: 1, engagedUsers: 5, activeUsers: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
