import { describe, expect, it } from 'vitest';
import { analyzeCriticalPath } from './critical-path';
describe('critical path analysis', () => {
  it('finds the longest dependency chain', () => expect(analyzeCriticalPath([
    { id: 'design', durationDays: 3, dependsOn: [] }, { id: 'build', durationDays: 5, dependsOn: ['design'] },
    { id: 'review', durationDays: 2, dependsOn: ['build'] }, { id: 'docs', durationDays: 4, dependsOn: ['design'] },
  ])).toEqual({ days: 10, path: ['design', 'build', 'review'] }));
  it('rejects dependency cycles', () => expect(() => analyzeCriticalPath([
    { id: 'a', durationDays: 1, dependsOn: ['b'] }, { id: 'b', durationDays: 1, dependsOn: ['a'] },
  ])).toThrow('cycle'));
});
