import { useState } from 'react';
import { AddIcon, BranchIcon, ChevronUpIcon } from '../Icons';
import Button from '../ui/Button';
import { twMerge } from 'tailwind-merge';
import BranchTree from './BranchTree';

type TBranchListProps = {
  branches: Array<{ id: string; name: string }>;
  currentBranchId: string;
  onSwitchBranch: (branchId: string) => void;
  onCreateBranch: () => void;
  isMainMenuCollapsed?: boolean;
};

const BranchList = ({
  branches,
  currentBranchId,
  onSwitchBranch,
  onCreateBranch,
  isMainMenuCollapsed,
}: TBranchListProps) => {
  const [isCollapsed, setIsCollapsed] = useState(isMainMenuCollapsed);
  const [showBranchTree, setShowBranchTree] = useState(false);
  return (
    <div className="border-t border-primary">
      <div
        className={twMerge(
          'flex items-center justify-between p-2 cursor-pointer text-primary font-semibold',
          isMainMenuCollapsed && 'justify-center'
        )}
      >
        {!isMainMenuCollapsed && <h3 className="text-base">Branches</h3>}
        <div className="flex items-center gap-1">
          <Button
            size={'icon'}
            onClick={onCreateBranch}
            variant={'brand'}
            className="rounded-full"
            title="Create Branch"
          >
            <AddIcon />
          </Button>
          {!isMainMenuCollapsed && (
            <Button
              size={'icon'}
              className={twMerge(
                'rounded-full',
                showBranchTree &&
                  'bg-brand-secondary text-brand-secondary-text hover:bg-brand-secondary-hover hover:text-brand-secondary-text'
              )}
              title="Branch tree"
              onClick={() => setShowBranchTree(!showBranchTree)}
            >
              <BranchIcon />
            </Button>
          )}
          {!isMainMenuCollapsed && (
            <Button
              size={'icon'}
              className="rounded-full"
              title="Toggle Branch"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronUpIcon />
              ) : (
                <ChevronUpIcon className="rotate-180" />
              )}
            </Button>
          )}
        </div>
      </div>
      {!isCollapsed && !showBranchTree && (
        <ul>
          {branches.map((branch) => (
            <li
              key={branch.id}
              className={`p-2 cursor-pointer border-b border-primary text-xs ${
                branch.id === currentBranchId
                  ? 'bg-brand-primary/80 text-brand-primary-text'
                  : 'hover:bg-primary-hover hover:text-primary'
              }`}
              onClick={() => onSwitchBranch(branch.id)}
            >
              {branch.name}
            </li>
          ))}
        </ul>
      )}
      {!isCollapsed && showBranchTree && (
        <div className="p-4">
          <BranchTree />
        </div>
      )}
    </div>
  );
};

export default BranchList;
