import { describe, expect, it } from 'vitest';
import { calculateAdoptionRate } from './adoption-rate';

describe('adoption rate', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, activeUsers: 3, eligibleUsers: 4 },
      { organizationId: 'north', projectId: 2, activeUsers: 1, eligibleUsers: 2 },
      { organizationId: 'south', projectId: 1, activeUsers: 10, eligibleUsers: 10 },
    ];
    expect(calculateAdoptionRate(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateAdoptionRate([
      { organizationId: 'north', projectId: 1, activeUsers: 5, eligibleUsers: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
