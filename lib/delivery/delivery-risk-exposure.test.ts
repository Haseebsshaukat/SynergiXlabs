import { describe, expect, it } from 'vitest';
import { calculateDeliveryRiskExposure } from './delivery-risk-exposure';

describe('delivery risk exposure', () => {
  const records = [
    { organizationId: 'north', projectId: 1, mitigatedRisks: 3, materialRisks: 4 },
    { organizationId: 'north', projectId: 2, mitigatedRisks: 1, materialRisks: 2 },
    { organizationId: 'south', projectId: 1, mitigatedRisks: 10, materialRisks: 10 },
  ];
  it('aggregates only records in the requested organization and project', () => {
    expect(calculateDeliveryRiskExposure(records, 'north', 1)).toEqual({ percentage: 75, sampleSize: 1 });
    expect(calculateDeliveryRiskExposure(records, 'north')).toEqual({ percentage: 66.67, sampleSize: 2 });
  });
  it('returns a stable empty result for an organization without records', () => {
    expect(calculateDeliveryRiskExposure(records, 'west')).toEqual({ percentage: 0, sampleSize: 0 });
  });
  it('rejects invalid scope and impossible totals', () => {
    expect(() => calculateDeliveryRiskExposure([{ organizationId: 'north', projectId: 1, mitigatedRisks: 5, materialRisks: 4 }], 'north')).toThrow('invalid');
    expect(() => calculateDeliveryRiskExposure(records, 'north', 0)).toThrow('invalid');
  });
});
