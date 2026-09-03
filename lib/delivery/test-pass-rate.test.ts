import { describe, expect, it } from 'vitest';
import { calculateTestPassRate } from './test-pass-rate';

describe('test pass rate', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, passedTests: 3, totalTests: 4 },
      { organizationId: 'north', projectId: 2, passedTests: 1, totalTests: 2 },
      { organizationId: 'south', projectId: 1, passedTests: 10, totalTests: 10 },
    ];
    expect(calculateTestPassRate(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateTestPassRate([
      { organizationId: 'north', projectId: 1, passedTests: 5, totalTests: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
