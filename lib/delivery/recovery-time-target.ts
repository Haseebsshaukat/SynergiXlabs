export interface RecoveryTimeTargetRecord {
  organizationId: string;
  projectId: number;
  recoveredWithinTarget: number;
  totalIncidents: number;
}

export const calculateRecoveryTimeTarget = (records: readonly RecoveryTimeTargetRecord[], organizationId: string, projectId?: number) => {
  if (!organizationId.trim()) throw new Error('RecoveryTimeTarget values are invalid');
  const visible = records.filter((record) => record.organizationId === organizationId
    && (projectId === undefined || record.projectId === projectId));
  if (visible.some((record) => !Number.isFinite(record.recoveredWithinTarget) || !Number.isFinite(record.totalIncidents)
    || record.recoveredWithinTarget < 0 || record.totalIncidents < 0 || record.recoveredWithinTarget > record.totalIncidents)) throw new Error('RecoveryTimeTarget values are invalid');
  const achieved = visible.reduce((sum, record) => sum + record.recoveredWithinTarget, 0);
  const total = visible.reduce((sum, record) => sum + record.totalIncidents, 0);
  return { percentage: total === 0 ? 0 : Math.round(achieved / total * 10000) / 100, sampleSize: visible.length };
};
