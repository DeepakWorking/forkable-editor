import { useMemo } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../ui/Select';
import { FONT_STYLES } from '@/constants/toolbar.constant';
import { TFontStyle } from '@/types/toolbar.type';

const FONT_STYLES_PLACEHOLDER = 'Select Font Style';
type TFontStyleSelectProps = {
  selectedFont?: TFontStyle;
  handleFontChange?: (value: TFontStyle) => void;
};

const FontStyleSelect = ({
  selectedFont,
  handleFontChange = () => {},
}: TFontStyleSelectProps) => {
  const fontStylesOption = useMemo(
    () =>
      FONT_STYLES.map((font) => ({
        value: font,
        label: <span style={{ fontFamily: font }}>{font}</span>,
      })),
    []
  );
  const handleFontStyleChange = (selectedOption: TFontStyle) => {
    if (handleFontChange) {
      handleFontChange(selectedOption);
    }
  };
  return (
    <Select
      onValueChange={handleFontStyleChange}
      defaultValue={selectedFont}
      value={selectedFont}
    >
      <SelectTrigger className="w-[180px] font-base">
        <SelectValue placeholder={FONT_STYLES_PLACEHOLDER} />
      </SelectTrigger>
      <SelectContent>
        {fontStylesOption.map((font) => (
          <SelectItem key={font.value} value={font.value}>
            {font.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FontStyleSelect;
