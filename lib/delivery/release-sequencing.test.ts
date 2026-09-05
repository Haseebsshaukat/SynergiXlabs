import { describe, expect, it } from 'vitest';
import { sequenceReleaseCandidates } from './release-sequencing';
describe('release sequencing', () => {
  it('respects dependencies before choosing the highest-priority ready item', () => expect(sequenceReleaseCandidates([
    { id: 'api', priority: 5, dependsOn: ['schema'] }, { id: 'docs', priority: 2, dependsOn: [] },
    { id: 'schema', priority: 3, dependsOn: [] }, { id: 'ui', priority: 4, dependsOn: ['api'] },
  ])).toEqual(['schema', 'api', 'ui', 'docs']));
  it('rejects references to missing candidates', () => expect(() => sequenceReleaseCandidates([{ id: 'api', priority: 1, dependsOn: ['schema'] }])).toThrow('invalid'));
});
