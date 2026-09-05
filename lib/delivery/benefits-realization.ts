import { DeliveryMetric, ratioMetric } from './metric';

export interface BenefitOutcome { organizationId: string; projectId: number; realizedValue: number; targetValue: number }

export const calculateBenefitsRealization = (outcomes: readonly BenefitOutcome[], organizationId: string, projectId?: number): DeliveryMetric => {
  const visible = outcomes.filter((item) => item.organizationId === organizationId && (projectId === undefined || item.projectId === projectId));
  if (!organizationId.trim() || visible.some((item) => !Number.isFinite(item.realizedValue) || !Number.isFinite(item.targetValue)
    || item.realizedValue < 0 || item.targetValue < 0)) throw new Error('Benefit outcome is invalid');
  return ratioMetric(visible.reduce((sum, item) => sum + item.realizedValue, 0), visible.reduce((sum, item) => sum + item.targetValue, 0), visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
