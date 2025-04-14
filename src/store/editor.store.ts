import { makeAutoObservable, runInAction } from 'mobx';
import { Step } from 'prosemirror-transform';
import { TVersion, TBranch } from '@/types/editor.type';
import { v4 as uuidv4 } from 'uuid';
import { throttle } from 'lodash';
import { AUTO_VERSION_DELAY } from '@/constants/app.constant';

class EditorStore {
  branches: TBranch[] = [];
  versions: Record<string, TVersion> = {};
  currentBranchId: string = '';
  currentVersionId: string = '';
  currentVersionIndex: number = 0;
  pendingSteps: Step[] = [];

  constructor() {
    makeAutoObservable(this);

    const mainBranch: TBranch = {
      id: uuidv4(),
      name: 'main',
      versionIds: [],
      headVersionId: '',
      createdAt: Date.now(),
    };
    this.branches.push(mainBranch);
    this.currentBranchId = mainBranch.id;
  }

  get currentBranch() {
    return this.branches.find((branch) => branch.id === this.currentBranchId);
  }

  get currentVersion() {
    return this.versions[this.currentVersionId];
  }

  addSteps(steps: Step[]) {
    runInAction(() => {
      this.pendingSteps.push(...steps);
    });
    this.throttledCreateVersion();
  }

  private throttledCreateVersion = throttle(
    this.createVersion.bind(this),
    AUTO_VERSION_DELAY,
    { leading: false, trailing: true }
  );

  private createVersion() {
    if (this.pendingSteps.length === 0) {
      console.warn('No pending steps to create a new version.');
      return;
    }
    const versionNumber = (this.currentBranch?.versionIds.length || 0) + 1;
    const newVersion: TVersion = {
      id: uuidv4(),
      steps: [...this.pendingSteps],
      label: `V${versionNumber}`,
      timestamp: Date.now(),
      parentVersionId: this.currentVersionId,
    };

    runInAction(() => {
      this.versions[newVersion.id] = newVersion;
      this.currentBranch?.versionIds.push(newVersion.id);
      this.currentBranch!.headVersionId = newVersion.id;
      this.currentVersionId = newVersion.id;
      this.currentVersionIndex = this.currentBranch!.versionIds.length - 1;
      this.pendingSteps = [];
    });

    console.log('Version created:', newVersion);
  }
  createBranchFromVersion(versionId: string) {
    const parentBranch = this.currentBranch;
    const parentVersion = this.versions[versionId];

    if (!parentBranch || !parentVersion) {
      console.error('Parent branch or version not found.');
      return;
    }

    const newBranchName = `${parentBranch.name}-${parentVersion.label}`;
    const newBranch: TBranch = {
      id: uuidv4(),
      name: newBranchName,
      versionIds: [versionId],
      headVersionId: versionId,
      parentBranchId: parentBranch.id,
      createdFromVersionId: versionId,
      createdAt: Date.now(),
    };

    runInAction(() => {
      this.branches.push(newBranch);
      this.currentBranchId = newBranch.id;
      this.currentVersionId = versionId;
      this.currentVersionIndex = 0;
    });

    console.log('Branch created:', newBranch);
  }

  switchBranch(branchId: string) {
    const branch = this.branches.find((b) => b.id === branchId);
    if (!branch) {
      console.error(`Branch with ID ${branchId} not found.`);
      return;
    }
    runInAction(() => {
      this.currentBranchId = branch.id;
      this.currentVersionId = branch.headVersionId;
      this.currentVersionIndex = branch.versionIds.length - 1;
    });
  }

  navigateToVersion(index: number) {
    if (
      !this.currentBranch ||
      index < 0 ||
      index >= this.currentBranch.versionIds.length
    ) {
      console.error(`Invalid version index: ${index}`);
      return;
    }
    const versionId = this.currentBranch.versionIds[index];
    runInAction(() => {
      this.currentVersionId = versionId;
      this.currentVersionIndex = index;
    });
  }
}

const editorStore = new EditorStore();
export default editorStore;
