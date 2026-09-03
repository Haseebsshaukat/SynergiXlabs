import { DeliveryMetric, ratioMetric } from './metric';

export interface IncidentResolutionRecord {
  organizationId: string;
  projectId: number;
  resolvedIncidents: number;
  totalIncidents: number;
}

export const calculateIncidentResolution = (
  records: readonly IncidentResolutionRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.resolvedIncidents) || !Number.isFinite(record.totalIncidents)
    || record.resolvedIncidents < 0 || record.totalIncidents < 0 || record.resolvedIncidents > record.totalIncidents)) {
    throw new Error('IncidentResolution values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.resolvedIncidents, 0);
  const possible = visible.reduce((total, record) => total + record.totalIncidents, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
