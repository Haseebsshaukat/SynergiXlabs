import { DeliveryMetric, ratioMetric } from './metric';

export interface CapacityCoverageRecord {
  organizationId: string;
  projectId: number;
  staffedHours: number;
  requiredHours: number;
}

export const calculateCapacityCoverage = (
  records: readonly CapacityCoverageRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.staffedHours) || !Number.isFinite(record.requiredHours)
    || record.staffedHours < 0 || record.requiredHours < 0 || record.staffedHours > record.requiredHours)) {
    throw new Error('CapacityCoverage values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.staffedHours, 0);
  const possible = visible.reduce((total, record) => total + record.requiredHours, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 70, direction: 'higher-is-better',
  });
};
