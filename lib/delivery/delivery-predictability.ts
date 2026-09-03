import { DeliveryMetric, ratioMetric } from './metric';

export interface DeliveryPredictabilityRecord {
  organizationId: string;
  projectId: number;
  onTimeItems: number;
  completedItems: number;
}

export const calculateDeliveryPredictability = (
  records: readonly DeliveryPredictabilityRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.onTimeItems) || !Number.isFinite(record.completedItems)
    || record.onTimeItems < 0 || record.completedItems < 0 || record.onTimeItems > record.completedItems)) {
    throw new Error('DeliveryPredictability values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.onTimeItems, 0);
  const possible = visible.reduce((total, record) => total + record.completedItems, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 85, critical: 55, direction: 'higher-is-better',
  });
};
