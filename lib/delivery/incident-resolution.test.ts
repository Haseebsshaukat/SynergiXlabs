import { describe, expect, it } from 'vitest';
import { calculateIncidentResolution } from './incident-resolution';

describe('incident resolution', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, resolvedIncidents: 3, totalIncidents: 4 },
      { organizationId: 'north', projectId: 2, resolvedIncidents: 1, totalIncidents: 2 },
      { organizationId: 'south', projectId: 1, resolvedIncidents: 10, totalIncidents: 10 },
    ];
    expect(calculateIncidentResolution(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateIncidentResolution([
      { organizationId: 'north', projectId: 1, resolvedIncidents: 5, totalIncidents: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
