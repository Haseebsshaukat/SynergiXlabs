import { describe, expect, it } from 'vitest';
import { calculateRecoveryTimeTarget } from './recovery-time-target';

describe('recovery time target', () => {
  it('aggregates only records in the requested scope', () => {
    expect(calculateRecoveryTimeTarget([{ organizationId: 'north', projectId: 1, recoveredWithinTarget: 3, totalIncidents: 4 }, { organizationId: 'north', projectId: 2, recoveredWithinTarget: 1, totalIncidents: 2 }, { organizationId: 'south', projectId: 1, recoveredWithinTarget: 10, totalIncidents: 10 }], 'north', 1))
      .toEqual({ percentage: 75, sampleSize: 1 });
  });
  it('rejects achieved values above their total', () => {
    expect(() => calculateRecoveryTimeTarget([{ organizationId: 'north', projectId: 1, recoveredWithinTarget: 5, totalIncidents: 4 }], 'north', 1)).toThrow('invalid');
  });
});
