import { describe, expect, it } from 'vitest';
import { calculateTrainingCompletion } from './training-completion';

describe('training completion', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, completedLearners: 3, totalLearners: 4 },
      { organizationId: 'north', projectId: 2, completedLearners: 1, totalLearners: 2 },
      { organizationId: 'south', projectId: 1, completedLearners: 10, totalLearners: 10 },
    ];
    expect(calculateTrainingCompletion(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateTrainingCompletion([
      { organizationId: 'north', projectId: 1, completedLearners: 5, totalLearners: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
