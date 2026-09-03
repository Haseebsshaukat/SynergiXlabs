import { describe, expect, it } from 'vitest';
import { calculateContingencyCoverage } from './contingency-coverage';

describe('contingency coverage', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, fundedRisks: 3, totalRisks: 4 },
      { organizationId: 'north', projectId: 2, fundedRisks: 1, totalRisks: 2 },
      { organizationId: 'south', projectId: 1, fundedRisks: 10, totalRisks: 10 },
    ];
    expect(calculateContingencyCoverage(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateContingencyCoverage([
      { organizationId: 'north', projectId: 1, fundedRisks: 5, totalRisks: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
