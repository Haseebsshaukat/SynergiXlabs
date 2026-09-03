import { DeliveryMetric, ratioMetric } from './metric';

export interface DocumentationCoverageRecord {
  organizationId: string;
  projectId: number;
  documentedCapabilities: number;
  totalCapabilities: number;
}

export const calculateDocumentationCoverage = (
  records: readonly DocumentationCoverageRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.documentedCapabilities) || !Number.isFinite(record.totalCapabilities)
    || record.documentedCapabilities < 0 || record.totalCapabilities < 0 || record.documentedCapabilities > record.totalCapabilities)) {
    throw new Error('DocumentationCoverage values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.documentedCapabilities, 0);
  const possible = visible.reduce((total, record) => total + record.totalCapabilities, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
