import { DeliveryMetric, ratioMetric } from './metric';

export interface VendorPerformanceRecord {
  organizationId: string;
  projectId: number;
  acceptedDeliverables: number;
  totalDeliverables: number;
}

export const calculateVendorPerformance = (
  records: readonly VendorPerformanceRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.acceptedDeliverables) || !Number.isFinite(record.totalDeliverables)
    || record.acceptedDeliverables < 0 || record.totalDeliverables < 0 || record.acceptedDeliverables > record.totalDeliverables)) {
    throw new Error('VendorPerformance values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.acceptedDeliverables, 0);
  const possible = visible.reduce((total, record) => total + record.totalDeliverables, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
