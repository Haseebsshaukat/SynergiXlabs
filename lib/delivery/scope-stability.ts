import { DeliveryMetric, ratioMetric } from './metric';

export interface ScopeStabilityRecord {
  organizationId: string;
  projectId: number;
  unchangedRequirements: number;
  totalRequirements: number;
}

export const calculateScopeStability = (
  records: readonly ScopeStabilityRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.unchangedRequirements) || !Number.isFinite(record.totalRequirements)
    || record.unchangedRequirements < 0 || record.totalRequirements < 0 || record.unchangedRequirements > record.totalRequirements)) {
    throw new Error('ScopeStability values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.unchangedRequirements, 0);
  const possible = visible.reduce((total, record) => total + record.totalRequirements, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 65, direction: 'higher-is-better',
  });
};
