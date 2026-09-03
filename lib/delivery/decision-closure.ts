import { DeliveryMetric, ratioMetric } from './metric';

export interface DecisionClosureRecord {
  organizationId: string;
  projectId: number;
  closedDecisions: number;
  totalDecisions: number;
}

export const calculateDecisionClosure = (
  records: readonly DecisionClosureRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.closedDecisions) || !Number.isFinite(record.totalDecisions)
    || record.closedDecisions < 0 || record.totalDecisions < 0 || record.closedDecisions > record.totalDecisions)) {
    throw new Error('DecisionClosure values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.closedDecisions, 0);
  const possible = visible.reduce((total, record) => total + record.totalDecisions, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 85, critical: 55, direction: 'higher-is-better',
  });
};
