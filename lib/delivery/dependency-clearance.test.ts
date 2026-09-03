import { describe, expect, it } from 'vitest';
import { calculateDependencyClearance } from './dependency-clearance';

describe('dependency clearance', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, clearedDependencies: 3, totalDependencies: 4 },
      { organizationId: 'north', projectId: 2, clearedDependencies: 1, totalDependencies: 2 },
      { organizationId: 'south', projectId: 1, clearedDependencies: 10, totalDependencies: 10 },
    ];
    expect(calculateDependencyClearance(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateDependencyClearance([
      { organizationId: 'north', projectId: 1, clearedDependencies: 5, totalDependencies: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
