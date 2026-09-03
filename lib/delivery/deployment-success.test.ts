import { describe, expect, it } from 'vitest';
import { calculateDeploymentSuccess } from './deployment-success';

describe('deployment success', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, successfulDeployments: 3, totalDeployments: 4 },
      { organizationId: 'north', projectId: 2, successfulDeployments: 1, totalDeployments: 2 },
      { organizationId: 'south', projectId: 1, successfulDeployments: 10, totalDeployments: 10 },
    ];
    expect(calculateDeploymentSuccess(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateDeploymentSuccess([
      { organizationId: 'north', projectId: 1, successfulDeployments: 5, totalDeployments: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
