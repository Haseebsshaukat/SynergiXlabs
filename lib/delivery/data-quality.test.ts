import { describe, expect, it } from 'vitest';
import { calculateDataQuality } from './data-quality';

describe('data quality', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, validRecords: 3, totalRecords: 4 },
      { organizationId: 'north', projectId: 2, validRecords: 1, totalRecords: 2 },
      { organizationId: 'south', projectId: 1, validRecords: 10, totalRecords: 10 },
    ];
    expect(calculateDataQuality(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateDataQuality([
      { organizationId: 'north', projectId: 1, validRecords: 5, totalRecords: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
