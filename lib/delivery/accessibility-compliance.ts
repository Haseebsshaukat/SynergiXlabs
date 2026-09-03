import { DeliveryMetric, ratioMetric } from './metric';

export interface AccessibilityComplianceRecord {
  organizationId: string;
  projectId: number;
  passedChecks: number;
  totalChecks: number;
}

export const calculateAccessibilityCompliance = (
  records: readonly AccessibilityComplianceRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.passedChecks) || !Number.isFinite(record.totalChecks)
    || record.passedChecks < 0 || record.totalChecks < 0 || record.passedChecks > record.totalChecks)) {
    throw new Error('AccessibilityCompliance values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.passedChecks, 0);
  const possible = visible.reduce((total, record) => total + record.totalChecks, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 95, critical: 75, direction: 'higher-is-better',
  });
};
