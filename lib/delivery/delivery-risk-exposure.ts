export interface DeliveryRiskExposureRecord {
  organizationId: string;
  projectId: number;
  mitigatedRisks: number;
  materialRisks: number;
}

export const calculateDeliveryRiskExposure = (
  records: readonly DeliveryRiskExposureRecord[], organizationId: string, projectId?: number,
) => {
  const scope = organizationId.trim();
  if (!scope || scope.length > 80) throw new Error('DeliveryRiskExposure values are invalid');
  if (projectId !== undefined && (!Number.isSafeInteger(projectId) || projectId <= 0)) {
    throw new Error('DeliveryRiskExposure projectId is invalid');
  }
  const visible = records.filter((record) => record.organizationId === scope
    && (projectId === undefined || record.projectId === projectId));
  if (visible.some((record) => !Number.isSafeInteger(record.projectId) || record.projectId <= 0
    || !Number.isSafeInteger(record.mitigatedRisks) || !Number.isSafeInteger(record.materialRisks)
    || record.mitigatedRisks < 0 || record.materialRisks < 0 || record.mitigatedRisks > record.materialRisks)) {
    throw new Error('DeliveryRiskExposure values are invalid');
  }
  const achieved = visible.reduce((sum, record) => sum + record.mitigatedRisks, 0);
  const denominator = visible.reduce((sum, record) => sum + record.materialRisks, 0);
  return { percentage: denominator === 0 ? 0 : Math.round(achieved / denominator * 10000) / 100, sampleSize: visible.length };
};
