import { describe, expect, it } from 'vitest';
import { calculateMeetingEffectiveness } from './meeting-effectiveness';

describe('meeting effectiveness', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, completedObjectives: 3, totalObjectives: 4 },
      { organizationId: 'north', projectId: 2, completedObjectives: 1, totalObjectives: 2 },
      { organizationId: 'south', projectId: 1, completedObjectives: 10, totalObjectives: 10 },
    ];
    expect(calculateMeetingEffectiveness(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateMeetingEffectiveness([
      { organizationId: 'north', projectId: 1, completedObjectives: 5, totalObjectives: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
