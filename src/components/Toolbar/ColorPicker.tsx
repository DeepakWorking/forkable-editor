import React, { useRef } from 'react';
import Button from '../ui/Button';

type TColorPickerProps = {
  handleChange?: (color: string) => void;
  selectedColor?: string;
  children: React.ReactNode;
};

const ColorPicker = ({
  handleChange,
  selectedColor,
  children,
}: TColorPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    if (handleChange) {
      handleChange(color);
    }
  };

  return (
    <div className="relative">
      <Button size="icon" onClick={handleButtonClick}>
        {children}
      </Button>
      <input
        ref={inputRef}
        type="color"
        value={selectedColor || '#000000'}
        onChange={handleColorChange}
        className="absolute top-8 left-0 h-0 w-0 opacity-0"
      />
    </div>
  );
};

export default ColorPicker;
