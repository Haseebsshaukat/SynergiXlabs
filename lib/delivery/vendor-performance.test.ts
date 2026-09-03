import { describe, expect, it } from 'vitest';
import { calculateVendorPerformance } from './vendor-performance';

describe('vendor performance', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, acceptedDeliverables: 3, totalDeliverables: 4 },
      { organizationId: 'north', projectId: 2, acceptedDeliverables: 1, totalDeliverables: 2 },
      { organizationId: 'south', projectId: 1, acceptedDeliverables: 10, totalDeliverables: 10 },
    ];
    expect(calculateVendorPerformance(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateVendorPerformance([
      { organizationId: 'north', projectId: 1, acceptedDeliverables: 5, totalDeliverables: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
