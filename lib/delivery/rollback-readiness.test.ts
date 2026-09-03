import { describe, expect, it } from 'vitest';
import { calculateRollbackReadiness } from './rollback-readiness';

describe('rollback readiness', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, verifiedSteps: 3, totalSteps: 4 },
      { organizationId: 'north', projectId: 2, verifiedSteps: 1, totalSteps: 2 },
      { organizationId: 'south', projectId: 1, verifiedSteps: 10, totalSteps: 10 },
    ];
    expect(calculateRollbackReadiness(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateRollbackReadiness([
      { organizationId: 'north', projectId: 1, verifiedSteps: 5, totalSteps: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
