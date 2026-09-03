import { describe, expect, it } from 'vitest';
import { calculateSupportResolution } from './support-resolution';

describe('support resolution', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, resolvedTickets: 3, totalTickets: 4 },
      { organizationId: 'north', projectId: 2, resolvedTickets: 1, totalTickets: 2 },
      { organizationId: 'south', projectId: 1, resolvedTickets: 10, totalTickets: 10 },
    ];
    expect(calculateSupportResolution(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateSupportResolution([
      { organizationId: 'north', projectId: 1, resolvedTickets: 5, totalTickets: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
