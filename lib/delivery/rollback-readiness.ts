import { DeliveryMetric, ratioMetric } from './metric';

export interface RollbackReadinessRecord {
  organizationId: string;
  projectId: number;
  verifiedSteps: number;
  totalSteps: number;
}

export const calculateRollbackReadiness = (
  records: readonly RollbackReadinessRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.verifiedSteps) || !Number.isFinite(record.totalSteps)
    || record.verifiedSteps < 0 || record.totalSteps < 0 || record.verifiedSteps > record.totalSteps)) {
    throw new Error('RollbackReadiness values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.verifiedSteps, 0);
  const possible = visible.reduce((total, record) => total + record.totalSteps, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 100, critical: 70, direction: 'higher-is-better',
  });
};
