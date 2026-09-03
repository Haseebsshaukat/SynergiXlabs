import { describe, expect, it } from 'vitest';
import { calculateDefectContainment } from './defect-containment';

describe('defect containment', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, preReleaseDefects: 3, totalDefects: 4 },
      { organizationId: 'north', projectId: 2, preReleaseDefects: 1, totalDefects: 2 },
      { organizationId: 'south', projectId: 1, preReleaseDefects: 10, totalDefects: 10 },
    ];
    expect(calculateDefectContainment(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateDefectContainment([
      { organizationId: 'north', projectId: 1, preReleaseDefects: 5, totalDefects: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
