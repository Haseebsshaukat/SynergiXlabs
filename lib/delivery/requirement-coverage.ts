import { DeliveryMetric, ratioMetric } from './metric';

export interface RequirementCoverageRecord {
  organizationId: string;
  projectId: number;
  tracedRequirements: number;
  totalRequirements: number;
}

export const calculateRequirementCoverage = (
  records: readonly RequirementCoverageRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.tracedRequirements) || !Number.isFinite(record.totalRequirements)
    || record.tracedRequirements < 0 || record.totalRequirements < 0 || record.tracedRequirements > record.totalRequirements)) {
    throw new Error('RequirementCoverage values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.tracedRequirements, 0);
  const possible = visible.reduce((total, record) => total + record.totalRequirements, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 95, critical: 70, direction: 'higher-is-better',
  });
};
