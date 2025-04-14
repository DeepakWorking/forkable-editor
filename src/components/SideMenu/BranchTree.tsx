import { observer } from 'mobx-react-lite';
import versionStore from '@/store/editor.store';

const BranchTree = observer(() => {
  const renderBranchTree = (branchId: string, depth: number = 0) => {
    const branch = versionStore.branches.find((b) => b.id === branchId);
    if (!branch) return null;

    return (
      <div key={branch.id} style={{ marginLeft: depth * 20 }}>
        <div
          className={`font-bold ${
            branch.id === versionStore.currentBranchId ? 'text-primary' : ''
          }`}
        >
          {branch.name}
        </div>
        <ul className="ml-4">
          {branch.versionIds.map((versionId) => {
            const version = versionStore.versions[versionId];
            return (
              <li
                key={versionId}
                className={`${
                  versionId === versionStore.currentVersionId
                    ? 'text-secondary font-semibold'
                    : ''
                }`}
              >
                {version.label}
              </li>
            );
          })}
        </ul>
        {versionStore.branches
          .filter((b) => b.parentBranchId === branch.id)
          .map((childBranch) => renderBranchTree(childBranch.id, depth + 1))}
      </div>
    );
  };

  const rootBranch = versionStore.branches.find((b) => !b.parentBranchId);
  if (!rootBranch) return <div>No branches available</div>;

  return <div className="p-4">{renderBranchTree(rootBranch.id)}</div>;
});

export default BranchTree;
