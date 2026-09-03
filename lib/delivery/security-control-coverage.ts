import { DeliveryMetric, ratioMetric } from './metric';

export interface SecurityControlCoverageRecord {
  organizationId: string;
  projectId: number;
  implementedControls: number;
  requiredControls: number;
}

export const calculateSecurityControlCoverage = (
  records: readonly SecurityControlCoverageRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.implementedControls) || !Number.isFinite(record.requiredControls)
    || record.implementedControls < 0 || record.requiredControls < 0 || record.implementedControls > record.requiredControls)) {
    throw new Error('SecurityControlCoverage values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.implementedControls, 0);
  const possible = visible.reduce((total, record) => total + record.requiredControls, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 95, critical: 70, direction: 'higher-is-better',
  });
};
