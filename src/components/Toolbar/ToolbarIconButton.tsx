import React from 'react';
import Button from '../ui/Button';

type TToolbarIconButton = {
  isActive: boolean;
  handleClick: () => void;
  children: React.ReactNode;
};

const ToolbarIconButton = ({
  isActive,
  handleClick,
  children,
}: TToolbarIconButton) => {
  return (
    <Button
      size="icon"
      onClick={handleClick}
      variant={isActive ? 'brand' : 'default'}
    >
      {children}
    </Button>
  );
};

export default ToolbarIconButton;
