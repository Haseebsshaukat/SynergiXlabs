import { DeliveryMetric, ratioMetric } from './metric';

export interface ErrorBudgetRecord {
  organizationId: string;
  projectId: number;
  remainingMinutes: number;
  budgetMinutes: number;
}

export const calculateErrorBudget = (
  records: readonly ErrorBudgetRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.remainingMinutes) || !Number.isFinite(record.budgetMinutes)
    || record.remainingMinutes < 0 || record.budgetMinutes < 0 || record.remainingMinutes > record.budgetMinutes)) {
    throw new Error('ErrorBudget values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.remainingMinutes, 0);
  const possible = visible.reduce((total, record) => total + record.budgetMinutes, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 70, critical: 25, direction: 'higher-is-better',
  });
};
