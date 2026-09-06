import { describe, expect, it } from 'vitest';
import { calculateAdoptionSustainability } from './adoption-sustainability';

describe('adoption sustainability', () => {
  const records = [
    { organizationId: 'north', projectId: 1, retainedUsers: 3, activatedUsers: 4 },
    { organizationId: 'north', projectId: 2, retainedUsers: 1, activatedUsers: 2 },
    { organizationId: 'south', projectId: 1, retainedUsers: 10, activatedUsers: 10 },
  ];
  it('aggregates only records in the requested organization and project', () => {
    expect(calculateAdoptionSustainability(records, 'north', 1)).toEqual({ percentage: 75, sampleSize: 1 });
    expect(calculateAdoptionSustainability(records, 'north')).toEqual({ percentage: 66.67, sampleSize: 2 });
  });
  it('returns a stable empty result for an organization without records', () => {
    expect(calculateAdoptionSustainability(records, 'west')).toEqual({ percentage: 0, sampleSize: 0 });
  });
  it('rejects invalid scope and impossible totals', () => {
    expect(() => calculateAdoptionSustainability([{ organizationId: 'north', projectId: 1, retainedUsers: 5, activatedUsers: 4 }], 'north')).toThrow('invalid');
    expect(() => calculateAdoptionSustainability(records, 'north', 0)).toThrow('invalid');
  });
});
