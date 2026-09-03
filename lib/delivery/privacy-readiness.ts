import { DeliveryMetric, ratioMetric } from './metric';

export interface PrivacyReadinessRecord {
  organizationId: string;
  projectId: number;
  completedAssessments: number;
  requiredAssessments: number;
}

export const calculatePrivacyReadiness = (
  records: readonly PrivacyReadinessRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.completedAssessments) || !Number.isFinite(record.requiredAssessments)
    || record.completedAssessments < 0 || record.requiredAssessments < 0 || record.completedAssessments > record.requiredAssessments)) {
    throw new Error('PrivacyReadiness values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.completedAssessments, 0);
  const possible = visible.reduce((total, record) => total + record.requiredAssessments, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 100, critical: 70, direction: 'higher-is-better',
  });
};
