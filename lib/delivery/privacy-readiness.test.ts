import { describe, expect, it } from 'vitest';
import { calculatePrivacyReadiness } from './privacy-readiness';

describe('privacy readiness', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, completedAssessments: 3, requiredAssessments: 4 },
      { organizationId: 'north', projectId: 2, completedAssessments: 1, requiredAssessments: 2 },
      { organizationId: 'south', projectId: 1, completedAssessments: 10, requiredAssessments: 10 },
    ];
    expect(calculatePrivacyReadiness(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculatePrivacyReadiness([
      { organizationId: 'north', projectId: 1, completedAssessments: 5, requiredAssessments: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
