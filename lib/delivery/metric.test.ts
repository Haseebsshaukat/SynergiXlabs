import { describe, expect, it } from 'vitest';
import { classify, percentage, ratioMetric } from './metric';

describe('delivery metrics', () => {
  it('calculates stable percentages without dividing by zero', () => {
    expect(percentage(1, 3)).toBe(33.33);
    expect(percentage(4, 0)).toBe(0);
  });
  it('classifies metrics in either direction', () => {
    expect(classify(92, { healthy: 90, critical: 60, direction: 'higher-is-better' })).toBe('healthy');
    expect(classify(18, { healthy: 5, critical: 15, direction: 'lower-is-better' })).toBe('critical');
  });
  it('returns the sample size with the result', () => {
    expect(ratioMetric(8, 10, 2, { healthy: 90, critical: 60, direction: 'higher-is-better' })).toEqual({ value: 80, sampleSize: 2, status: 'watch' });
  });
});
