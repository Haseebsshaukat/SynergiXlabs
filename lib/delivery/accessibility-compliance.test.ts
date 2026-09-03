import { describe, expect, it } from 'vitest';
import { calculateAccessibilityCompliance } from './accessibility-compliance';

describe('accessibility compliance', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, passedChecks: 3, totalChecks: 4 },
      { organizationId: 'north', projectId: 2, passedChecks: 1, totalChecks: 2 },
      { organizationId: 'south', projectId: 1, passedChecks: 10, totalChecks: 10 },
    ];
    expect(calculateAccessibilityCompliance(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateAccessibilityCompliance([
      { organizationId: 'north', projectId: 1, passedChecks: 5, totalChecks: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
