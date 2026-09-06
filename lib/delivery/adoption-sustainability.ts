export interface AdoptionSustainabilityRecord {
  organizationId: string;
  projectId: number;
  retainedUsers: number;
  activatedUsers: number;
}

export const calculateAdoptionSustainability = (
  records: readonly AdoptionSustainabilityRecord[], organizationId: string, projectId?: number,
) => {
  const scope = organizationId.trim();
  if (!scope || scope.length > 80) throw new Error('AdoptionSustainability values are invalid');
  if (projectId !== undefined && (!Number.isSafeInteger(projectId) || projectId <= 0)) {
    throw new Error('AdoptionSustainability projectId is invalid');
  }
  const visible = records.filter((record) => record.organizationId === scope
    && (projectId === undefined || record.projectId === projectId));
  if (visible.some((record) => !Number.isSafeInteger(record.projectId) || record.projectId <= 0
    || !Number.isSafeInteger(record.retainedUsers) || !Number.isSafeInteger(record.activatedUsers)
    || record.retainedUsers < 0 || record.activatedUsers < 0 || record.retainedUsers > record.activatedUsers)) {
    throw new Error('AdoptionSustainability values are invalid');
  }
  const achieved = visible.reduce((sum, record) => sum + record.retainedUsers, 0);
  const denominator = visible.reduce((sum, record) => sum + record.activatedUsers, 0);
  return { percentage: denominator === 0 ? 0 : Math.round(achieved / denominator * 10000) / 100, sampleSize: visible.length };
};
