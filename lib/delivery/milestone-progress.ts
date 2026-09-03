import { DeliveryMetric, ratioMetric } from './metric';

export interface MilestoneProgressRecord {
  organizationId: string;
  projectId: number;
  completedMilestones: number;
  totalMilestones: number;
}

export const calculateMilestoneProgress = (
  records: readonly MilestoneProgressRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.completedMilestones) || !Number.isFinite(record.totalMilestones)
    || record.completedMilestones < 0 || record.totalMilestones < 0 || record.completedMilestones > record.totalMilestones)) {
    throw new Error('MilestoneProgress values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.completedMilestones, 0);
  const possible = visible.reduce((total, record) => total + record.totalMilestones, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 85, critical: 50, direction: 'higher-is-better',
  });
};
