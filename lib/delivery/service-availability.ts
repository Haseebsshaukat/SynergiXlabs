import { DeliveryMetric, ratioMetric } from './metric';

export interface ServiceAvailabilityRecord {
  organizationId: string;
  projectId: number;
  availableMinutes: number;
  totalMinutes: number;
}

export const calculateServiceAvailability = (
  records: readonly ServiceAvailabilityRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.availableMinutes) || !Number.isFinite(record.totalMinutes)
    || record.availableMinutes < 0 || record.totalMinutes < 0 || record.availableMinutes > record.totalMinutes)) {
    throw new Error('ServiceAvailability values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.availableMinutes, 0);
  const possible = visible.reduce((total, record) => total + record.totalMinutes, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 99, critical: 95, direction: 'higher-is-better',
  });
};
