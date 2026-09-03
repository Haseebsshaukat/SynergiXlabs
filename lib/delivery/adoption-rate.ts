import { DeliveryMetric, ratioMetric } from './metric';

export interface AdoptionRateRecord {
  organizationId: string;
  projectId: number;
  activeUsers: number;
  eligibleUsers: number;
}

export const calculateAdoptionRate = (
  records: readonly AdoptionRateRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.activeUsers) || !Number.isFinite(record.eligibleUsers)
    || record.activeUsers < 0 || record.eligibleUsers < 0 || record.activeUsers > record.eligibleUsers)) {
    throw new Error('AdoptionRate values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.activeUsers, 0);
  const possible = visible.reduce((total, record) => total + record.eligibleUsers, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 75, critical: 35, direction: 'higher-is-better',
  });
};
