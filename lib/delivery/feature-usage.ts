import { DeliveryMetric, ratioMetric } from './metric';

export interface FeatureUsageRecord {
  organizationId: string;
  projectId: number;
  engagedUsers: number;
  activeUsers: number;
}

export const calculateFeatureUsage = (
  records: readonly FeatureUsageRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.engagedUsers) || !Number.isFinite(record.activeUsers)
    || record.engagedUsers < 0 || record.activeUsers < 0 || record.engagedUsers > record.activeUsers)) {
    throw new Error('FeatureUsage values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.engagedUsers, 0);
  const possible = visible.reduce((total, record) => total + record.activeUsers, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 65, critical: 25, direction: 'higher-is-better',
  });
};
