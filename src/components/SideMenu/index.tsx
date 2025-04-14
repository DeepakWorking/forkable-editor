import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import versionStore from '@/store/editor.store';
import VersionHeader from './VersionHeader';
import VersionList from './VersionList';
import BranchList from './BranchList';

const SideMenu = observer(() => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const versions =
    versionStore.currentBranch?.versionIds
      .map((id) => versionStore.versions[id])
      .sort((a, b) => b.timestamp - a.timestamp) || [];

  const branches = versionStore.branches;

  const handleCreateBranch = () => {
    const selectedVersion = versionStore.currentVersion;
    if (selectedVersion) {
      versionStore.createBranchFromVersion(selectedVersion.id);
    }
  };

  return (
    <div
      className={`h-full bg-primary flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      } border-primary border-l-2 border-t-2 border-b-2 rounded-l-md shadow-lg pt-2 transition-all duration-300`}
    >
      <VersionHeader
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        currentBranchName={versionStore.currentBranch?.name || 'No Branch'}
        onPrevious={() =>
          versionStore.navigateToVersion(versionStore.currentVersionIndex - 1)
        }
        onNext={() =>
          versionStore.navigateToVersion(versionStore.currentVersionIndex + 1)
        }
        hasPrevious={versionStore.currentVersionIndex > 0}
        hasNext={
          versionStore.currentVersionIndex <
          (versionStore.currentBranch?.versionIds.length || 0) - 1
        }
      />

      <div className="flex-1 overflow-y-auto">
        <VersionList
          versions={versions}
          currentVersionId={versionStore.currentVersionId}
          onSelectVersion={(versionId) =>
            versionStore.navigateToVersion(
              versionStore.currentBranch?.versionIds.indexOf(versionId) || 0
            )
          }
          isMainMenuCollapsed={isCollapsed}
        />
      </div>

      <BranchList
        branches={branches}
        currentBranchId={versionStore.currentBranchId}
        onSwitchBranch={(branchId) => versionStore.switchBranch(branchId)}
        onCreateBranch={handleCreateBranch}
        isMainMenuCollapsed={isCollapsed}
      />
    </div>
  );
});

export default SideMenu;
