import { describe, expect, it } from 'vitest';
import { calculateDecisionLatencyTarget } from './decision-latency-target';

describe('decision latency target', () => {
  it('aggregates only records in the requested scope', () => {
    expect(calculateDecisionLatencyTarget([{ organizationId: 'north', projectId: 1, onTimeDecisions: 3, totalDecisions: 4 }, { organizationId: 'north', projectId: 2, onTimeDecisions: 1, totalDecisions: 2 }, { organizationId: 'south', projectId: 1, onTimeDecisions: 10, totalDecisions: 10 }], 'north', 1))
      .toEqual({ percentage: 75, sampleSize: 1 });
  });
  it('rejects achieved values above their total', () => {
    expect(() => calculateDecisionLatencyTarget([{ organizationId: 'north', projectId: 1, onTimeDecisions: 5, totalDecisions: 4 }], 'north', 1)).toThrow('invalid');
  });
});
