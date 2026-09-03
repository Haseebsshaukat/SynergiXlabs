import { DeliveryMetric, ratioMetric } from './metric';

export interface DeploymentSuccessRecord {
  organizationId: string;
  projectId: number;
  successfulDeployments: number;
  totalDeployments: number;
}

export const calculateDeploymentSuccess = (
  records: readonly DeploymentSuccessRecord[],
  scope: { organizationId: string; projectId?: number },
): DeliveryMetric => {
  const visible = records.filter((record) => record.organizationId === scope.organizationId
    && (scope.projectId === undefined || record.projectId === scope.projectId));
  if (visible.some((record) => !Number.isFinite(record.successfulDeployments) || !Number.isFinite(record.totalDeployments)
    || record.successfulDeployments < 0 || record.totalDeployments < 0 || record.successfulDeployments > record.totalDeployments)) {
    throw new Error('DeploymentSuccess values are invalid');
  }
  const achieved = visible.reduce((total, record) => total + record.successfulDeployments, 0);
  const possible = visible.reduce((total, record) => total + record.totalDeployments, 0);
  return ratioMetric(achieved, possible, visible.length, {
    healthy: 95, critical: 80, direction: 'higher-is-better',
  });
};
