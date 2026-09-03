import { DeliveryMetric, ratioMetric } from './metric';

export interface EstimateConfidenceRecord {
  organizationId: string;
  projectId: number;
  estimatedItems: number;
  totalItems: number;
}

export const calculateEstimateConfidence = (
  records: readonly EstimateConfidenceRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.estimatedItems) || !Number.isFinite(record.totalItems)
    || record.estimatedItems < 0 || record.totalItems < 0 || record.estimatedItems > record.totalItems)) {
    throw new Error('EstimateConfidence values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.estimatedItems, 0);
  const possible = visible.reduce((total, record) => total + record.totalItems, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
