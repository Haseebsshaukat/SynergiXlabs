import { DeliveryMetric, ratioMetric } from './metric';

export interface RiskMitigationRecord {
  organizationId: string;
  projectId: number;
  mitigatedRisks: number;
  totalRisks: number;
}

export const calculateRiskMitigation = (
  records: readonly RiskMitigationRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.mitigatedRisks) || !Number.isFinite(record.totalRisks)
    || record.mitigatedRisks < 0 || record.totalRisks < 0 || record.mitigatedRisks > record.totalRisks)) {
    throw new Error('RiskMitigation values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.mitigatedRisks, 0);
  const possible = visible.reduce((total, record) => total + record.totalRisks, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 85, critical: 55, direction: 'higher-is-better',
  });
};
