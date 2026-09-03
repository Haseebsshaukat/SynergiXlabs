import { describe, expect, it } from 'vitest';
import { calculateDocumentationCoverage } from './documentation-coverage';

describe('documentation coverage', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, documentedCapabilities: 3, totalCapabilities: 4 },
      { organizationId: 'north', projectId: 2, documentedCapabilities: 1, totalCapabilities: 2 },
      { organizationId: 'south', projectId: 1, documentedCapabilities: 10, totalCapabilities: 10 },
    ];
    expect(calculateDocumentationCoverage(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateDocumentationCoverage([
      { organizationId: 'north', projectId: 1, documentedCapabilities: 5, totalCapabilities: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
