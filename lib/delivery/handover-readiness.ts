import { DeliveryMetric, ratioMetric } from './metric';

export interface HandoverReadinessRecord {
  organizationId: string;
  projectId: number;
  acceptedArtifacts: number;
  requiredArtifacts: number;
}

export const calculateHandoverReadiness = (
  records: readonly HandoverReadinessRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.acceptedArtifacts) || !Number.isFinite(record.requiredArtifacts)
    || record.acceptedArtifacts < 0 || record.requiredArtifacts < 0 || record.acceptedArtifacts > record.requiredArtifacts)) {
    throw new Error('HandoverReadiness values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.acceptedArtifacts, 0);
  const possible = visible.reduce((total, record) => total + record.requiredArtifacts, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 95, critical: 70, direction: 'higher-is-better',
  });
};
