import { Step } from 'prosemirror-transform';

export type TVersion = {
  id: string;
  steps: Step[];
  label: string;
  timestamp: number;
  parentVersionId?: string;
};

export type TBranch = {
  id: string;
  name: string;
  versionIds: string[];
  headVersionId: string;
  parentBranchId?: string;
  createdFromVersionId?: string;
  createdAt: number;
};
