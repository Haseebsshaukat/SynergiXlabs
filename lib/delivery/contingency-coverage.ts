import { DeliveryMetric, ratioMetric } from './metric';

export interface ContingencyCoverageRecord {
  organizationId: string;
  projectId: number;
  fundedRisks: number;
  totalRisks: number;
}

export const calculateContingencyCoverage = (
  records: readonly ContingencyCoverageRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.fundedRisks) || !Number.isFinite(record.totalRisks)
    || record.fundedRisks < 0 || record.totalRisks < 0 || record.fundedRisks > record.totalRisks)) {
    throw new Error('ContingencyCoverage values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.fundedRisks, 0);
  const possible = visible.reduce((total, record) => total + record.totalRisks, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
