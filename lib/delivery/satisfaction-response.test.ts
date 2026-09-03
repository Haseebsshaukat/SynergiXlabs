import { describe, expect, it } from 'vitest';
import { calculateSatisfactionResponse } from './satisfaction-response';

describe('satisfaction response', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, positiveResponses: 3, totalResponses: 4 },
      { organizationId: 'north', projectId: 2, positiveResponses: 1, totalResponses: 2 },
      { organizationId: 'south', projectId: 1, positiveResponses: 10, totalResponses: 10 },
    ];
    expect(calculateSatisfactionResponse(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateSatisfactionResponse([
      { organizationId: 'north', projectId: 1, positiveResponses: 5, totalResponses: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
