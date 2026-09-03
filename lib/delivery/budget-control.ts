import { DeliveryMetric, ratioMetric } from './metric';

export interface BudgetControlRecord {
  organizationId: string;
  projectId: number;
  controlledSpend: number;
  totalSpend: number;
}

export const calculateBudgetControl = (
  records: readonly BudgetControlRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.controlledSpend) || !Number.isFinite(record.totalSpend)
    || record.controlledSpend < 0 || record.totalSpend < 0 || record.controlledSpend > record.totalSpend)) {
    throw new Error('BudgetControl values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.controlledSpend, 0);
  const possible = visible.reduce((total, record) => total + record.totalSpend, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 95, critical: 75, direction: 'higher-is-better',
  });
};
