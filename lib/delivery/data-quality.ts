import { DeliveryMetric, ratioMetric } from './metric';

export interface DataQualityRecord {
  organizationId: string;
  projectId: number;
  validRecords: number;
  totalRecords: number;
}

export const calculateDataQuality = (
  records: readonly DataQualityRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.validRecords) || !Number.isFinite(record.totalRecords)
    || record.validRecords < 0 || record.totalRecords < 0 || record.validRecords > record.totalRecords)) {
    throw new Error('DataQuality values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.validRecords, 0);
  const possible = visible.reduce((total, record) => total + record.totalRecords, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 98, critical: 85, direction: 'higher-is-better',
  });
};
