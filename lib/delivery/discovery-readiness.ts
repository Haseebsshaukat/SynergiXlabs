import { DeliveryMetric, ratioMetric } from './metric';

export interface DiscoveryReadinessRecord {
  organizationId: string;
  projectId: number;
  answeredQuestions: number;
  totalQuestions: number;
}

export const calculateDiscoveryReadiness = (
  records: readonly DiscoveryReadinessRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.answeredQuestions) || !Number.isFinite(record.totalQuestions)
    || record.answeredQuestions < 0 || record.totalQuestions < 0 || record.answeredQuestions > record.totalQuestions)) {
    throw new Error('DiscoveryReadiness values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.answeredQuestions, 0);
  const possible = visible.reduce((total, record) => total + record.totalQuestions, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 85, critical: 50, direction: 'higher-is-better',
  });
};
