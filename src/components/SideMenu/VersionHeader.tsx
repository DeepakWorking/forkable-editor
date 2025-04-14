import React from 'react';
import Button from '../ui/Button';
import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  MenuIcon,
} from '../Icons';
import { twMerge } from 'tailwind-merge';

type TVersionHeaderProps = {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  currentBranchName: string;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
};

const VersionHeader: React.FC<TVersionHeaderProps> = ({
  isCollapsed,
  setIsCollapsed,
  currentBranchName,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) => {
  return (
    <div
      className={twMerge(
        'flex items-center justify-between p-2 border-b border-primary',
        isCollapsed && 'justify-center'
      )}
    >
      <div className="flex items-center gap-2">
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          <MenuIcon className="fill-brand-primary hover:fill-brand-primary-hover h-7 w-7" />
        </button>
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-primary text-ellipsis overflow-hidden whitespace-nowrap">
            {currentBranchName}
          </h2>
        )}
      </div>
      {!isCollapsed && (
        <div className="flex gap-1">
          <Button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="rounded-full p-1 h-7 w-7"
          >
            <ChevronLeftCircleIcon className="fill-brand-primary hover:fill-brand-primary-hover" />
          </Button>
          <Button
            onClick={onNext}
            disabled={!hasNext}
            className="rounded-full p-1 h-7 w-7"
          >
            <ChevronRightCircleIcon className="fill-brand-primary hover:fill-brand-primary-hover" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VersionHeader;
