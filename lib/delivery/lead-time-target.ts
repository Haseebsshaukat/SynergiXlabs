import { DeliveryMetric, ratioMetric } from './metric';

export interface LeadTimeTargetRecord {
  organizationId: string;
  projectId: number;
  itemsWithinTarget: number;
  totalItems: number;
}

export const calculateLeadTimeTarget = (
  records: readonly LeadTimeTargetRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.itemsWithinTarget) || !Number.isFinite(record.totalItems)
    || record.itemsWithinTarget < 0 || record.totalItems < 0 || record.itemsWithinTarget > record.totalItems)) {
    throw new Error('LeadTimeTarget values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.itemsWithinTarget, 0);
  const possible = visible.reduce((total, record) => total + record.totalItems, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 85, critical: 55, direction: 'higher-is-better',
  });
};
