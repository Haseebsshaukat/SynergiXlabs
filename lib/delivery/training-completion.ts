import { DeliveryMetric, ratioMetric } from './metric';

export interface TrainingCompletionRecord {
  organizationId: string;
  projectId: number;
  completedLearners: number;
  totalLearners: number;
}

export const calculateTrainingCompletion = (
  records: readonly TrainingCompletionRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.completedLearners) || !Number.isFinite(record.totalLearners)
    || record.completedLearners < 0 || record.totalLearners < 0 || record.completedLearners > record.totalLearners)) {
    throw new Error('TrainingCompletion values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.completedLearners, 0);
  const possible = visible.reduce((total, record) => total + record.totalLearners, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
