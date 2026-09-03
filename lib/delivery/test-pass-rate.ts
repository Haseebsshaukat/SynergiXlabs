import { DeliveryMetric, ratioMetric } from './metric';

export interface TestPassRateRecord {
  organizationId: string;
  projectId: number;
  passedTests: number;
  totalTests: number;
}

export const calculateTestPassRate = (
  records: readonly TestPassRateRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.passedTests) || !Number.isFinite(record.totalTests)
    || record.passedTests < 0 || record.totalTests < 0 || record.passedTests > record.totalTests)) {
    throw new Error('TestPassRate values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.passedTests, 0);
  const possible = visible.reduce((total, record) => total + record.totalTests, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 98, critical: 85, direction: 'higher-is-better',
  });
};
