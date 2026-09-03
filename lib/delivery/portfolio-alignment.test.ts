import { describe, expect, it } from 'vitest';
import { calculatePortfolioAlignment } from './portfolio-alignment';

describe('portfolio alignment', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, alignedInitiatives: 3, totalInitiatives: 4 },
      { organizationId: 'north', projectId: 2, alignedInitiatives: 1, totalInitiatives: 2 },
      { organizationId: 'south', projectId: 1, alignedInitiatives: 10, totalInitiatives: 10 },
    ];
    expect(calculatePortfolioAlignment(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculatePortfolioAlignment([
      { organizationId: 'north', projectId: 1, alignedInitiatives: 5, totalInitiatives: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
