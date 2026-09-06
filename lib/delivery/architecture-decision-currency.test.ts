import { describe, expect, it } from 'vitest';
import { calculateArchitectureDecisionCurrency } from './architecture-decision-currency';

describe('architecture decision currency', () => {
  const records = [
    { organizationId: 'north', projectId: 1, currentDecisions: 3, activeDecisions: 4 },
    { organizationId: 'north', projectId: 2, currentDecisions: 1, activeDecisions: 2 },
    { organizationId: 'south', projectId: 1, currentDecisions: 10, activeDecisions: 10 },
  ];
  it('aggregates only records in the requested organization and project', () => {
    expect(calculateArchitectureDecisionCurrency(records, 'north', 1)).toEqual({ percentage: 75, sampleSize: 1 });
    expect(calculateArchitectureDecisionCurrency(records, 'north')).toEqual({ percentage: 66.67, sampleSize: 2 });
  });
  it('returns a stable empty result for an organization without records', () => {
    expect(calculateArchitectureDecisionCurrency(records, 'west')).toEqual({ percentage: 0, sampleSize: 0 });
  });
  it('rejects invalid scope and impossible totals', () => {
    expect(() => calculateArchitectureDecisionCurrency([{ organizationId: 'north', projectId: 1, currentDecisions: 5, activeDecisions: 4 }], 'north')).toThrow('invalid');
    expect(() => calculateArchitectureDecisionCurrency(records, 'north', 0)).toThrow('invalid');
  });
});
