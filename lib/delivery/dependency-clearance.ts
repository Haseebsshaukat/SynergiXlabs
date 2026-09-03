import { DeliveryMetric, ratioMetric } from './metric';

export interface DependencyClearanceRecord {
  organizationId: string;
  projectId: number;
  clearedDependencies: number;
  totalDependencies: number;
}

export const calculateDependencyClearance = (
  records: readonly DependencyClearanceRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.clearedDependencies) || !Number.isFinite(record.totalDependencies)
    || record.clearedDependencies < 0 || record.totalDependencies < 0 || record.clearedDependencies > record.totalDependencies)) {
    throw new Error('DependencyClearance values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.clearedDependencies, 0);
  const possible = visible.reduce((total, record) => total + record.totalDependencies, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
