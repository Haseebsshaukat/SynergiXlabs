import { describe, expect, it } from 'vitest';
import { calculateDeliveryPredictability } from './delivery-predictability';

describe('delivery predictability', () => {
  it('aggregates only records visible to the requested scope', () => {
    const records = [
      { organizationId: 'north', projectId: 1, onTimeItems: 3, completedItems: 4 },
      { organizationId: 'north', projectId: 2, onTimeItems: 1, completedItems: 2 },
      { organizationId: 'south', projectId: 1, onTimeItems: 10, completedItems: 10 },
    ];
    expect(calculateDeliveryPredictability(records, { organizationId: 'north', projectId: 1 }))
      .toMatchObject({ value: 75, sampleSize: 1 });
  });

  it('rejects impossible achieved and total values', () => {
    expect(() => calculateDeliveryPredictability([
      { organizationId: 'north', projectId: 1, onTimeItems: 5, completedItems: 4 },
    ], { organizationId: 'north' })).toThrow('invalid');
  });
});
