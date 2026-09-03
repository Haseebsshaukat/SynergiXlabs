import { describe, expect, it } from 'vitest';
import { calculateRiskMitigation } from './risk-mitigation';

describe('risk mitigation', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, mitigatedRisks: 3, totalRisks: 4 },
      { organizationId: 'north', projectId: 2, mitigatedRisks: 1, totalRisks: 2 },
      { organizationId: 'south', projectId: 1, mitigatedRisks: 10, totalRisks: 10 },
    ];
    expect(calculateRiskMitigation(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateRiskMitigation([
      { organizationId: 'north', projectId: 1, mitigatedRisks: 5, totalRisks: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
