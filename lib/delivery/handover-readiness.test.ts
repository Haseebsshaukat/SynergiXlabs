import { describe, expect, it } from 'vitest';
import { calculateHandoverReadiness } from './handover-readiness';

describe('handover readiness', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, acceptedArtifacts: 3, requiredArtifacts: 4 },
      { organizationId: 'north', projectId: 2, acceptedArtifacts: 1, requiredArtifacts: 2 },
      { organizationId: 'south', projectId: 1, acceptedArtifacts: 10, requiredArtifacts: 10 },
    ];
    expect(calculateHandoverReadiness(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateHandoverReadiness([
      { organizationId: 'north', projectId: 1, acceptedArtifacts: 5, requiredArtifacts: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
