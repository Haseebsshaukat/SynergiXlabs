import { describe, expect, it } from 'vitest';
import { calculateKnowledgeResilience } from './knowledge-resilience';

describe('knowledge resilience', () => {
  it('aggregates only records in the requested scope', () => {
    expect(calculateKnowledgeResilience([{ organizationId: 'north', projectId: 1, sharedCapabilities: 3, criticalCapabilities: 4 }, { organizationId: 'north', projectId: 2, sharedCapabilities: 1, criticalCapabilities: 2 }, { organizationId: 'south', projectId: 1, sharedCapabilities: 10, criticalCapabilities: 10 }], 'north', 1))
      .toEqual({ percentage: 75, sampleSize: 1 });
  });
  it('rejects achieved values above their total', () => {
    expect(() => calculateKnowledgeResilience([{ organizationId: 'north', projectId: 1, sharedCapabilities: 5, criticalCapabilities: 4 }], 'north', 1)).toThrow('invalid');
  });
});
