import { describe, expect, it } from 'vitest';
import { calculateCapacityCoverage } from './capacity-coverage';

describe('capacity coverage', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, staffedHours: 3, requiredHours: 4 },
      { organizationId: 'north', projectId: 2, staffedHours: 1, requiredHours: 2 },
      { organizationId: 'south', projectId: 1, staffedHours: 10, requiredHours: 10 },
    ];
    expect(calculateCapacityCoverage(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateCapacityCoverage([
      { organizationId: 'north', projectId: 1, staffedHours: 5, requiredHours: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
