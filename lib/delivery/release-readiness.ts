import { DeliveryMetric, ratioMetric } from './metric';

export interface ReleaseReadinessRecord {
  organizationId: string;
  projectId: number;
  completedChecks: number;
  totalChecks: number;
}

export const calculateReleaseReadiness = (
  records: readonly ReleaseReadinessRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.completedChecks) || !Number.isFinite(record.totalChecks)
    || record.completedChecks < 0 || record.totalChecks < 0 || record.completedChecks > record.totalChecks)) {
    throw new Error('ReleaseReadiness values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.completedChecks, 0);
  const possible = visible.reduce((total, record) => total + record.totalChecks, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 95, critical: 70, direction: 'higher-is-better',
  });
};
