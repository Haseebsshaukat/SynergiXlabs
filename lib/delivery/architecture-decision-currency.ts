export interface ArchitectureDecisionCurrencyRecord {
  organizationId: string;
  projectId: number;
  currentDecisions: number;
  activeDecisions: number;
}

export const calculateArchitectureDecisionCurrency = (
  records: readonly ArchitectureDecisionCurrencyRecord[], organizationId: string, projectId?: number,
) => {
  const scope = organizationId.trim();
  if (!scope || scope.length > 80) throw new Error('ArchitectureDecisionCurrency values are invalid');
  if (projectId !== undefined && (!Number.isSafeInteger(projectId) || projectId <= 0)) {
    throw new Error('ArchitectureDecisionCurrency projectId is invalid');
  }
  const visible = records.filter((record) => record.organizationId === scope
    && (projectId === undefined || record.projectId === projectId));
  if (visible.some((record) => !Number.isSafeInteger(record.projectId) || record.projectId <= 0
    || !Number.isSafeInteger(record.currentDecisions) || !Number.isSafeInteger(record.activeDecisions)
    || record.currentDecisions < 0 || record.activeDecisions < 0 || record.currentDecisions > record.activeDecisions)) {
    throw new Error('ArchitectureDecisionCurrency values are invalid');
  }
  const achieved = visible.reduce((sum, record) => sum + record.currentDecisions, 0);
  const denominator = visible.reduce((sum, record) => sum + record.activeDecisions, 0);
  return { percentage: denominator === 0 ? 0 : Math.round(achieved / denominator * 10000) / 100, sampleSize: visible.length };
};
