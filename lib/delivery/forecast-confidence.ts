export interface DeliveryForecast { confidence: number; forecastDays: number; actualDays?: number }

export const calculateForecastConfidence = (forecasts: readonly DeliveryForecast[]) => {
  if (forecasts.length === 0 || forecasts.some((item) => !Number.isFinite(item.confidence) || item.confidence < 0
    || item.confidence > 1 || !Number.isFinite(item.forecastDays) || item.forecastDays <= 0
    || (item.actualDays !== undefined && (!Number.isFinite(item.actualDays) || item.actualDays <= 0)))) throw new Error('Forecast values are invalid');
  const completed = forecasts.filter((item) => item.actualDays !== undefined);
  const weightedError = completed.reduce((sum, item) => sum + Math.abs(item.actualDays! - item.forecastDays) / item.forecastDays * item.confidence, 0);
  const weight = completed.reduce((sum, item) => sum + item.confidence, 0);
  return { confidence: Math.round((weight === 0 ? 0 : Math.max(0, 1 - weightedError / weight)) * 10000) / 100, sampleSize: completed.length };
};
