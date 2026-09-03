export type MetricStatus = 'healthy' | 'watch' | 'critical';

export interface DeliveryMetric {
  value: number;
  sampleSize: number;
  status: MetricStatus;
}

export interface MetricThresholds {
  healthy: number;
  critical: number;
  direction: 'higher-is-better' | 'lower-is-better';
}

export const percentage = (part: number, whole: number): number =>
  whole <= 0 ? 0 : Math.round(part / whole * 10000) / 100;

export const classify = (value: number, thresholds: MetricThresholds): MetricStatus => {
  if (thresholds.direction === 'higher-is-better') {
    if (value >= thresholds.healthy) return 'healthy';
    if (value <= thresholds.critical) return 'critical';
    return 'watch';
  }
  if (value <= thresholds.healthy) return 'healthy';
  if (value >= thresholds.critical) return 'critical';
  return 'watch';
};

export const ratioMetric = (
  part: number, whole: number, sampleSize: number, thresholds: MetricThresholds,
): DeliveryMetric => {
  const value = percentage(part, whole);
  return { value, sampleSize, status: classify(value, thresholds) };
};
