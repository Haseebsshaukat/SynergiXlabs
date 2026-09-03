import { describe, expect, it } from 'vitest';
import { calculateMigrationReadiness } from './migration-readiness';

describe('migration readiness', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, completedChecks: 3, totalChecks: 4 },
      { organizationId: 'north', projectId: 2, completedChecks: 1, totalChecks: 2 },
      { organizationId: 'south', projectId: 1, completedChecks: 10, totalChecks: 10 },
    ];
    expect(calculateMigrationReadiness(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateMigrationReadiness([
      { organizationId: 'north', projectId: 1, completedChecks: 5, totalChecks: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
