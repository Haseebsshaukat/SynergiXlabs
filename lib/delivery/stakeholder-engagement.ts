import { DeliveryMetric, ratioMetric } from './metric';

export interface StakeholderEngagementRecord {
  organizationId: string;
  projectId: number;
  engagedStakeholders: number;
  totalStakeholders: number;
}

export const calculateStakeholderEngagement = (
  records: readonly StakeholderEngagementRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.engagedStakeholders) || !Number.isFinite(record.totalStakeholders)
    || record.engagedStakeholders < 0 || record.totalStakeholders < 0 || record.engagedStakeholders > record.totalStakeholders)) {
    throw new Error('StakeholderEngagement values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.engagedStakeholders, 0);
  const possible = visible.reduce((total, record) => total + record.totalStakeholders, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 80, critical: 50, direction: 'higher-is-better',
  });
};
