export interface DecisionLatencyTargetRecord {
  organizationId: string;
  projectId: number;
  onTimeDecisions: number;
  totalDecisions: number;
}

export const calculateDecisionLatencyTarget = (records: readonly DecisionLatencyTargetRecord[], organizationId: string, projectId?: number) => {
  if (!organizationId.trim()) throw new Error('DecisionLatencyTarget values are invalid');
  const visible = records.filter((record) => record.organizationId === organizationId
    && (projectId === undefined || record.projectId === projectId));
  if (visible.some((record) => !Number.isFinite(record.onTimeDecisions) || !Number.isFinite(record.totalDecisions)
    || record.onTimeDecisions < 0 || record.totalDecisions < 0 || record.onTimeDecisions > record.totalDecisions)) throw new Error('DecisionLatencyTarget values are invalid');
  const achieved = visible.reduce((sum, record) => sum + record.onTimeDecisions, 0);
  const total = visible.reduce((sum, record) => sum + record.totalDecisions, 0);
  return { percentage: total === 0 ? 0 : Math.round(achieved / total * 10000) / 100, sampleSize: visible.length };
};
