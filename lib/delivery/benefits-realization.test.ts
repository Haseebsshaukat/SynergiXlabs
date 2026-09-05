import { describe, expect, it } from 'vitest';
import { calculateBenefitsRealization } from './benefits-realization';
describe('benefits realization', () => {
  it('measures only outcomes in the requested tenant and project', () => expect(calculateBenefitsRealization([
    { organizationId: 'north', projectId: 1, realizedValue: 80, targetValue: 100 },
    { organizationId: 'north', projectId: 2, realizedValue: 100, targetValue: 100 },
    { organizationId: 'south', projectId: 1, realizedValue: 0, targetValue: 100 },
  ], 'north', 1)).toEqual({ value: 80, sampleSize: 1, status: 'watch' }));
  it('rejects negative outcome values', () => expect(() => calculateBenefitsRealization([{ organizationId: 'north', projectId: 1, realizedValue: -1, targetValue: 10 }], 'north')).toThrow('invalid'));
});
