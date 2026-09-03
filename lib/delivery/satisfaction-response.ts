import { DeliveryMetric, ratioMetric } from './metric';

export interface SatisfactionResponseRecord {
  organizationId: string;
  projectId: number;
  positiveResponses: number;
  totalResponses: number;
}

export const calculateSatisfactionResponse = (
  records: readonly SatisfactionResponseRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.positiveResponses) || !Number.isFinite(record.totalResponses)
    || record.positiveResponses < 0 || record.totalResponses < 0 || record.positiveResponses > record.totalResponses)) {
    throw new Error('SatisfactionResponse values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.positiveResponses, 0);
  const possible = visible.reduce((total, record) => total + record.totalResponses, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 80, critical: 50, direction: 'higher-is-better',
  });
};
