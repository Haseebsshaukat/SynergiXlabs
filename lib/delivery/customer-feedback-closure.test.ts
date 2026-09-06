import { describe, expect, it } from 'vitest';
import { calculateCustomerFeedbackClosure } from './customer-feedback-closure';

describe('customer feedback closure', () => {
  const records = [
    { organizationId: 'north', projectId: 1, closedFeedback: 3, actionableFeedback: 4 },
    { organizationId: 'north', projectId: 2, closedFeedback: 1, actionableFeedback: 2 },
    { organizationId: 'south', projectId: 1, closedFeedback: 10, actionableFeedback: 10 },
  ];
  it('aggregates only records in the requested organization and project', () => {
    expect(calculateCustomerFeedbackClosure(records, 'north', 1)).toEqual({ percentage: 75, sampleSize: 1 });
    expect(calculateCustomerFeedbackClosure(records, 'north')).toEqual({ percentage: 66.67, sampleSize: 2 });
  });
  it('returns a stable empty result for an organization without records', () => {
    expect(calculateCustomerFeedbackClosure(records, 'west')).toEqual({ percentage: 0, sampleSize: 0 });
  });
  it('rejects invalid scope and impossible totals', () => {
    expect(() => calculateCustomerFeedbackClosure([{ organizationId: 'north', projectId: 1, closedFeedback: 5, actionableFeedback: 4 }], 'north')).toThrow('invalid');
    expect(() => calculateCustomerFeedbackClosure(records, 'north', 0)).toThrow('invalid');
  });
});
