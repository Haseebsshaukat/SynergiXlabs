import { describe, expect, it } from 'vitest';
import { calculateRoadmapConfidence } from './roadmap-confidence';

describe('roadmap confidence', () => {
  it('aggregates only records in the requested scope', () => {
    expect(calculateRoadmapConfidence([{ organizationId: 'north', projectId: 1, confidentOutcomes: 3, plannedOutcomes: 4 }, { organizationId: 'north', projectId: 2, confidentOutcomes: 1, plannedOutcomes: 2 }, { organizationId: 'south', projectId: 1, confidentOutcomes: 10, plannedOutcomes: 10 }], 'north', 1))
      .toEqual({ percentage: 75, sampleSize: 1 });
  });
  it('rejects achieved values above their total', () => {
    expect(() => calculateRoadmapConfidence([{ organizationId: 'north', projectId: 1, confidentOutcomes: 5, plannedOutcomes: 4 }], 'north', 1)).toThrow('invalid');
  });
});
