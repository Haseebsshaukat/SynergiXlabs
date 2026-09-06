import { describe, expect, it } from 'vitest';
import { calculateServiceTransitionReadiness } from './service-transition-readiness';

describe('service transition readiness', () => {
  const records = [
    { organizationId: 'north', projectId: 1, acceptedControls: 3, requiredControls: 4 },
    { organizationId: 'north', projectId: 2, acceptedControls: 1, requiredControls: 2 },
    { organizationId: 'south', projectId: 1, acceptedControls: 10, requiredControls: 10 },
  ];
  it('aggregates only records in the requested organization and project', () => {
    expect(calculateServiceTransitionReadiness(records, 'north', 1)).toEqual({ percentage: 75, sampleSize: 1 });
    expect(calculateServiceTransitionReadiness(records, 'north')).toEqual({ percentage: 66.67, sampleSize: 2 });
  });
  it('returns a stable empty result for an organization without records', () => {
    expect(calculateServiceTransitionReadiness(records, 'west')).toEqual({ percentage: 0, sampleSize: 0 });
  });
  it('rejects invalid scope and impossible totals', () => {
    expect(() => calculateServiceTransitionReadiness([{ organizationId: 'north', projectId: 1, acceptedControls: 5, requiredControls: 4 }], 'north')).toThrow('invalid');
    expect(() => calculateServiceTransitionReadiness(records, 'north', 0)).toThrow('invalid');
  });
});
