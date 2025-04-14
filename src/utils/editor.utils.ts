import { TVersion } from '@/types/editor.type';
import { Step } from 'prosemirror-transform';

export const getCumulativeSteps = (
  versionId: string,
  versions: Record<string, TVersion>
): Step[] => {
  const steps: Step[] = [];
  const visited = new Set<string>();
  let currentVersion: TVersion | undefined = versions[versionId];

  while (currentVersion) {
    if (visited.has(currentVersion.id)) {
      console.error('Circular reference detected in version hierarchy.');
      break;
    }
    visited.add(currentVersion.id);
    steps.unshift(...currentVersion.steps);
    currentVersion = currentVersion.parentVersionId
      ? versions[currentVersion.parentVersionId]
      : undefined;
  }

  return steps;
};
