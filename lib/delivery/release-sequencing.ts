export interface ReleaseCandidate { id: string; priority: number; dependsOn: readonly string[] }

export const sequenceReleaseCandidates = (candidates: readonly ReleaseCandidate[]) => {
  const remaining = new Map(candidates.map((item) => [item.id, item]));
  if (remaining.size !== candidates.length || candidates.some((item) => !item.id.trim() || !Number.isFinite(item.priority)
    || item.dependsOn.some((id) => !remaining.has(id)))) throw new Error('Release candidate is invalid');
  const delivered = new Set<string>(); const order: string[] = [];
  while (remaining.size > 0) {
    const ready = [...remaining.values()].filter((item) => item.dependsOn.every((id) => delivered.has(id)))
      .sort((left, right) => right.priority - left.priority || left.id.localeCompare(right.id));
    if (ready.length === 0) throw new Error('Release dependencies contain a cycle');
    const next = ready[0]; order.push(next.id); delivered.add(next.id); remaining.delete(next.id);
  }
  return order;
};
