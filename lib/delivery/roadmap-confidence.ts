export interface RoadmapConfidenceRecord {
  organizationId: string;
  projectId: number;
  confidentOutcomes: number;
  plannedOutcomes: number;
}

export const calculateRoadmapConfidence = (records: readonly RoadmapConfidenceRecord[], organizationId: string, projectId?: number) => {
  if (!organizationId.trim()) throw new Error('RoadmapConfidence values are invalid');
  const visible = records.filter((record) => record.organizationId === organizationId
    && (projectId === undefined || record.projectId === projectId));
  if (visible.some((record) => !Number.isFinite(record.confidentOutcomes) || !Number.isFinite(record.plannedOutcomes)
    || record.confidentOutcomes < 0 || record.plannedOutcomes < 0 || record.confidentOutcomes > record.plannedOutcomes)) throw new Error('RoadmapConfidence values are invalid');
  const achieved = visible.reduce((sum, record) => sum + record.confidentOutcomes, 0);
  const total = visible.reduce((sum, record) => sum + record.plannedOutcomes, 0);
  return { percentage: total === 0 ? 0 : Math.round(achieved / total * 10000) / 100, sampleSize: visible.length };
};
