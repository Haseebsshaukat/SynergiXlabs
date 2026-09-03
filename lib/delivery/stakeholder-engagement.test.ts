import { describe, expect, it } from 'vitest';
import { calculateStakeholderEngagement } from './stakeholder-engagement';

describe('stakeholder engagement', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, engagedStakeholders: 3, totalStakeholders: 4 },
      { organizationId: 'north', projectId: 2, engagedStakeholders: 1, totalStakeholders: 2 },
      { organizationId: 'south', projectId: 1, engagedStakeholders: 10, totalStakeholders: 10 },
    ];
    expect(calculateStakeholderEngagement(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateStakeholderEngagement([
      { organizationId: 'north', projectId: 1, engagedStakeholders: 5, totalStakeholders: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
