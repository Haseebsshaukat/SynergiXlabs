import { DeliveryMetric, ratioMetric } from './metric';

export interface ActionClosureRecord {
  organizationId: string;
  projectId: number;
  closedActions: number;
  totalActions: number;
}

export const calculateActionClosure = (
  records: readonly ActionClosureRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.closedActions) || !Number.isFinite(record.totalActions)
    || record.closedActions < 0 || record.totalActions < 0 || record.closedActions > record.totalActions)) {
    throw new Error('ActionClosure values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.closedActions, 0);
  const possible = visible.reduce((total, record) => total + record.totalActions, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 85, critical: 55, direction: 'higher-is-better',
  });
};
