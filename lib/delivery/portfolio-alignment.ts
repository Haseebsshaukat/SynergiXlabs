import { DeliveryMetric, ratioMetric } from './metric';

export interface PortfolioAlignmentRecord {
  organizationId: string;
  projectId: number;
  alignedInitiatives: number;
  totalInitiatives: number;
}

export const calculatePortfolioAlignment = (
  records: readonly PortfolioAlignmentRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.alignedInitiatives) || !Number.isFinite(record.totalInitiatives)
    || record.alignedInitiatives < 0 || record.totalInitiatives < 0 || record.alignedInitiatives > record.totalInitiatives)) {
    throw new Error('PortfolioAlignment values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.alignedInitiatives, 0);
  const possible = visible.reduce((total, record) => total + record.totalInitiatives, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
