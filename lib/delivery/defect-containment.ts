import { DeliveryMetric, ratioMetric } from './metric';

export interface DefectContainmentRecord {
  organizationId: string;
  projectId: number;
  preReleaseDefects: number;
  totalDefects: number;
}

export const calculateDefectContainment = (
  records: readonly DefectContainmentRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.preReleaseDefects) || !Number.isFinite(record.totalDefects)
    || record.preReleaseDefects < 0 || record.totalDefects < 0 || record.preReleaseDefects > record.totalDefects)) {
    throw new Error('DefectContainment values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.preReleaseDefects, 0);
  const possible = visible.reduce((total, record) => total + record.totalDefects, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 90, critical: 60, direction: 'higher-is-better',
  });
};
