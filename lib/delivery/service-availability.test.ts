import { describe, expect, it } from 'vitest';
import { calculateServiceAvailability } from './service-availability';

describe('service availability', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, availableMinutes: 3, totalMinutes: 4 },
      { organizationId: 'north', projectId: 2, availableMinutes: 1, totalMinutes: 2 },
      { organizationId: 'south', projectId: 1, availableMinutes: 10, totalMinutes: 10 },
    ];
    expect(calculateServiceAvailability(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateServiceAvailability([
      { organizationId: 'north', projectId: 1, availableMinutes: 5, totalMinutes: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
