import { describe, expect, it } from 'vitest';
import { calculateDiscoveryReadiness } from './discovery-readiness';

describe('discovery readiness', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, answeredQuestions: 3, totalQuestions: 4 },
      { organizationId: 'north', projectId: 2, answeredQuestions: 1, totalQuestions: 2 },
      { organizationId: 'south', projectId: 1, answeredQuestions: 10, totalQuestions: 10 },
    ];
    expect(calculateDiscoveryReadiness(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateDiscoveryReadiness([
      { organizationId: 'north', projectId: 1, answeredQuestions: 5, totalQuestions: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
