import React from 'react';

type TVersionListProps = {
  versions: Array<{ id: string; label: string; timestamp: number }>;
  currentVersionId: string;
  onSelectVersion: (versionId: string) => void;
  isMainMenuCollapsed?: boolean;
};

const VersionList: React.FC<TVersionListProps> = ({
  versions,
  currentVersionId,
  onSelectVersion,
  isMainMenuCollapsed,
}) => {
  return (
    <ul className="oveflow-y-auto max-h-[3/4]">
      {versions.map((version) => (
        <li
          key={version.id}
          className={`p-2 cursor-pointer border-b border-primary ${
            version.id === currentVersionId
              ? 'bg-brand-primary text-brand-primary-text'
              : 'hover:bg-primary-hover hover:text-primary'
          }`}
          onClick={() => onSelectVersion(version.id)}
        >
          <div className="flex items-center gap-1">
            <p className="font-semibold">{version.label}</p>
            {!isMainMenuCollapsed && (
              <p className="text-xs self-end">
                ({new Date(version.timestamp).toLocaleString()})
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default VersionList;
