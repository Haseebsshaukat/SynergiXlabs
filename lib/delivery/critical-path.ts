export interface DeliveryDependency { id: string; durationDays: number; dependsOn: readonly string[] }

export const analyzeCriticalPath = (items: readonly DeliveryDependency[]) => {
  const byId = new Map(items.map((item) => [item.id, item]));
  if (byId.size !== items.length || items.some((item) => !item.id.trim() || !Number.isFinite(item.durationDays)
    || item.durationDays < 0 || item.dependsOn.some((id) => !byId.has(id)))) throw new Error('Critical path input is invalid');
  const visiting = new Set<string>(); const memo = new Map<string, { days: number; path: string[] }>();
  const visit = (id: string): { days: number; path: string[] } => {
    if (visiting.has(id)) throw new Error('Critical path contains a cycle');
    const cached = memo.get(id); if (cached) return cached;
    visiting.add(id); const item = byId.get(id)!;
    const prior = item.dependsOn.map(visit).sort((a, b) => b.days - a.days)[0] ?? { days: 0, path: [] };
    visiting.delete(id); const result = { days: prior.days + item.durationDays, path: [...prior.path, id] };
    memo.set(id, result); return result;
  };
  return items.map((item) => visit(item.id)).sort((a, b) => b.days - a.days)[0] ?? { days: 0, path: [] };
};
