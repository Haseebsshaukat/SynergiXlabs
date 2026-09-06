export interface CustomerFeedbackClosureRecord {
  organizationId: string;
  projectId: number;
  closedFeedback: number;
  actionableFeedback: number;
}

export const calculateCustomerFeedbackClosure = (
  records: readonly CustomerFeedbackClosureRecord[], organizationId: string, projectId?: number,
) => {
  const scope = organizationId.trim();
  if (!scope || scope.length > 80) throw new Error('CustomerFeedbackClosure values are invalid');
  if (projectId !== undefined && (!Number.isSafeInteger(projectId) || projectId <= 0)) {
    throw new Error('CustomerFeedbackClosure projectId is invalid');
  }
  const visible = records.filter((record) => record.organizationId === scope
    && (projectId === undefined || record.projectId === projectId));
  if (visible.some((record) => !Number.isSafeInteger(record.projectId) || record.projectId <= 0
    || !Number.isSafeInteger(record.closedFeedback) || !Number.isSafeInteger(record.actionableFeedback)
    || record.closedFeedback < 0 || record.actionableFeedback < 0 || record.closedFeedback > record.actionableFeedback)) {
    throw new Error('CustomerFeedbackClosure values are invalid');
  }
  const achieved = visible.reduce((sum, record) => sum + record.closedFeedback, 0);
  const denominator = visible.reduce((sum, record) => sum + record.actionableFeedback, 0);
  return { percentage: denominator === 0 ? 0 : Math.round(achieved / denominator * 10000) / 100, sampleSize: visible.length };
};
