import { DeliveryMetric, ratioMetric } from './metric';

export interface SupportResolutionRecord {
  organizationId: string;
  projectId: number;
  resolvedTickets: number;
  totalTickets: number;
}

export const calculateSupportResolution = (
  records: readonly SupportResolutionRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.resolvedTickets) || !Number.isFinite(record.totalTickets)
    || record.resolvedTickets < 0 || record.totalTickets < 0 || record.resolvedTickets > record.totalTickets)) {
    throw new Error('SupportResolution values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.resolvedTickets, 0);
  const possible = visible.reduce((total, record) => total + record.totalTickets, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 65, direction: 'higher-is-better',
  });
};
