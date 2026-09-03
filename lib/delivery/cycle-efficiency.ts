import { DeliveryMetric, ratioMetric } from './metric';

export interface CycleEfficiencyRecord {
  organizationId: string;
  projectId: number;
  activeDays: number;
  totalDays: number;
}

export const calculateCycleEfficiency = (
  records: readonly CycleEfficiencyRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.activeDays) || !Number.isFinite(record.totalDays)
    || record.activeDays < 0 || record.totalDays < 0 || record.activeDays > record.totalDays)) {
    throw new Error('CycleEfficiency values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.activeDays, 0);
  const possible = visible.reduce((total, record) => total + record.totalDays, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 65, critical: 30, direction: 'higher-is-better',
  });
};
