export interface ServiceTransitionReadinessRecord {
  organizationId: string;
  projectId: number;
  acceptedControls: number;
  requiredControls: number;
}

export const calculateServiceTransitionReadiness = (
  records: readonly ServiceTransitionReadinessRecord[], organizationId: string, projectId?: number,
) => {
  const scope = organizationId.trim();
  if (!scope || scope.length > 80) throw new Error('ServiceTransitionReadiness values are invalid');
  if (projectId !== undefined && (!Number.isSafeInteger(projectId) || projectId <= 0)) {
    throw new Error('ServiceTransitionReadiness projectId is invalid');
  }
  const visible = records.filter((record) => record.organizationId === scope
    && (projectId === undefined || record.projectId === projectId));
  if (visible.some((record) => !Number.isSafeInteger(record.projectId) || record.projectId <= 0
    || !Number.isSafeInteger(record.acceptedControls) || !Number.isSafeInteger(record.requiredControls)
    || record.acceptedControls < 0 || record.requiredControls < 0 || record.acceptedControls > record.requiredControls)) {
    throw new Error('ServiceTransitionReadiness values are invalid');
  }
  const achieved = visible.reduce((sum, record) => sum + record.acceptedControls, 0);
  const denominator = visible.reduce((sum, record) => sum + record.requiredControls, 0);
  return { percentage: denominator === 0 ? 0 : Math.round(achieved / denominator * 10000) / 100, sampleSize: visible.length };
};
