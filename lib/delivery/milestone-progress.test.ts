import { describe, expect, it } from 'vitest';
import { calculateMilestoneProgress } from './milestone-progress';

describe('milestone progress', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, completedMilestones: 3, totalMilestones: 4 },
      { organizationId: 'north', projectId: 2, completedMilestones: 1, totalMilestones: 2 },
      { organizationId: 'south', projectId: 1, completedMilestones: 10, totalMilestones: 10 },
    ];
    expect(calculateMilestoneProgress(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateMilestoneProgress([
      { organizationId: 'north', projectId: 1, completedMilestones: 5, totalMilestones: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
