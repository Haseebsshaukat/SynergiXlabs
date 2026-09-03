import { DeliveryMetric, ratioMetric } from './metric';

export interface CloudBudgetEfficiencyRecord {
  organizationId: string;
  projectId: number;
  optimizedServices: number;
  totalServices: number;
}

export const calculateCloudBudgetEfficiency = (
  records: readonly CloudBudgetEfficiencyRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.optimizedServices) || !Number.isFinite(record.totalServices)
    || record.optimizedServices < 0 || record.totalServices < 0 || record.optimizedServices > record.totalServices)) {
    throw new Error('CloudBudgetEfficiency values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.optimizedServices, 0);
  const possible = visible.reduce((total, record) => total + record.totalServices, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 80, critical: 45, direction: 'higher-is-better',
  });
};
