import { describe, expect, it } from 'vitest';
import { calculateSecurityControlCoverage } from './security-control-coverage';

describe('security control coverage', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, implementedControls: 3, requiredControls: 4 },
      { organizationId: 'north', projectId: 2, implementedControls: 1, requiredControls: 2 },
      { organizationId: 'south', projectId: 1, implementedControls: 10, requiredControls: 10 },
    ];
    expect(calculateSecurityControlCoverage(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateSecurityControlCoverage([
      { organizationId: 'north', projectId: 1, implementedControls: 5, requiredControls: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
