import { DeliveryMetric, ratioMetric } from './metric';

export interface ChangeApprovalRecord {
  organizationId: string;
  projectId: number;
  decidedChanges: number;
  totalChanges: number;
}

export const calculateChangeApproval = (
  records: readonly ChangeApprovalRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.decidedChanges) || !Number.isFinite(record.totalChanges)
    || record.decidedChanges < 0 || record.totalChanges < 0 || record.decidedChanges > record.totalChanges)) {
    throw new Error('ChangeApproval values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.decidedChanges, 0);
  const possible = visible.reduce((total, record) => total + record.totalChanges, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
