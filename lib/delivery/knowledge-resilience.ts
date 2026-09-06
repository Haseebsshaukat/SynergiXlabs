export interface KnowledgeResilienceRecord {
  organizationId: string;
  projectId: number;
  sharedCapabilities: number;
  criticalCapabilities: number;
}

export const calculateKnowledgeResilience = (records: readonly KnowledgeResilienceRecord[], organizationId: string, projectId?: number) => {
  if (!organizationId.trim()) throw new Error('KnowledgeResilience values are invalid');
  const visible = records.filter((record) => record.organizationId === organizationId
    && (projectId === undefined || record.projectId === projectId));
  if (visible.some((record) => !Number.isFinite(record.sharedCapabilities) || !Number.isFinite(record.criticalCapabilities)
    || record.sharedCapabilities < 0 || record.criticalCapabilities < 0 || record.sharedCapabilities > record.criticalCapabilities)) throw new Error('KnowledgeResilience values are invalid');
  const achieved = visible.reduce((sum, record) => sum + record.sharedCapabilities, 0);
  const total = visible.reduce((sum, record) => sum + record.criticalCapabilities, 0);
  return { percentage: total === 0 ? 0 : Math.round(achieved / total * 10000) / 100, sampleSize: visible.length };
};
