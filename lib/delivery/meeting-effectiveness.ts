import { DeliveryMetric, ratioMetric } from './metric';

export interface MeetingEffectivenessRecord {
  organizationId: string;
  projectId: number;
  completedObjectives: number;
  totalObjectives: number;
}

export const calculateMeetingEffectiveness = (
  records: readonly MeetingEffectivenessRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.completedObjectives) || !Number.isFinite(record.totalObjectives)
    || record.completedObjectives < 0 || record.totalObjectives < 0 || record.completedObjectives > record.totalObjectives)) {
    throw new Error('MeetingEffectiveness values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.completedObjectives, 0);
  const possible = visible.reduce((total, record) => total + record.totalObjectives, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 80, critical: 50, direction: 'higher-is-better',
  });
};
