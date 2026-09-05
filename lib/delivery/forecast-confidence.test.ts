import { describe, expect, it } from 'vitest';
import { calculateForecastConfidence } from './forecast-confidence';
describe('forecast confidence', () => {
  it('weights completed forecast accuracy by stated confidence', () => expect(calculateForecastConfidence([
    { confidence: 1, forecastDays: 10, actualDays: 12 }, { confidence: 0.5, forecastDays: 20, actualDays: 20 },
    { confidence: 0.8, forecastDays: 8 },
  ])).toEqual({ confidence: 86.67, sampleSize: 2 }));
  it('rejects confidence outside zero to one', () => expect(() => calculateForecastConfidence([{ confidence: 1.1, forecastDays: 5 }])).toThrow('invalid'));
});
