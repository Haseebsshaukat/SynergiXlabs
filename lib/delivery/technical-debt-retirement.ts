export interface TechnicalDebtRetirementRecord {
  organizationId: string;
  projectId: number;
  retiredItems: number;
  plannedItems: number;
}

export const calculateTechnicalDebtRetirement = (records: readonly TechnicalDebtRetirementRecord[], organizationId: string, projectId?: number) => {
  if (!organizationId.trim()) throw new Error('TechnicalDebtRetirement values are invalid');
  const visible = records.filter((record) => record.organizationId === organizationId
    && (projectId === undefined || record.projectId === projectId));
  if (visible.some((record) => !Number.isFinite(record.retiredItems) || !Number.isFinite(record.plannedItems)
    || record.retiredItems < 0 || record.plannedItems < 0 || record.retiredItems > record.plannedItems)) throw new Error('TechnicalDebtRetirement values are invalid');
  const achieved = visible.reduce((sum, record) => sum + record.retiredItems, 0);
  const total = visible.reduce((sum, record) => sum + record.plannedItems, 0);
  return { percentage: total === 0 ? 0 : Math.round(achieved / total * 10000) / 100, sampleSize: visible.length };
};
