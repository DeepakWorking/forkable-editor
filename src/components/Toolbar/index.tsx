import { Editor } from '@tiptap/react';
import {
  BoldIcon,
  BulletListIcon,
  CodeBlockIcon,
  CodeIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  H4Icon,
  H5Icon,
  HighlightIcon,
  HorizontalRuleIcon,
  ItalicIcon,
  NumberedListIcon,
  QuoteIcon,
  StrikethroughIcon,
  TextColorIcon,
  UnderlineIcon,
  LineBreakIcon,
  UndoIcon,
  RedoIcon,
} from '../Icons';
import { Level } from '@tiptap/extension-heading';
import ToolbarIconButton from './ToolbarIconButton';
import FontStyleSelect from './FontStylesSelect';
import { TFontStyle } from '@/types/toolbar.type';
import { FONT_STYLES } from '@/constants/toolbar.constant';
import ColorPicker from './ColorPicker';
import { useCallback } from 'react';
import { FaRemoveFormat } from 'react-icons/fa';

type TToolBarProps = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: TToolBarProps) => {
  const handleToggleHeading = (level: Level) => {
    if (editor) {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const activeHeading = editor?.isActive('heading')
    ? editor.getAttributes('heading').level
    : null;

  const headingLevels: {
    level: Level;
    Icon: React.ElementType;
  }[] = [
    { level: 1, Icon: H1Icon },
    { level: 2, Icon: H2Icon },
    { level: 3, Icon: H3Icon },
    { level: 4, Icon: H4Icon },
    { level: 5, Icon: H5Icon },
  ];
  const handleFontChange = (font: TFontStyle) => {
    if (editor && editor.isEditable) {
      editor.chain().focus().setFontFamily(font).run();
    }
  };
  const selectedFont = useCallback(() => {
    return FONT_STYLES.find((font) => {
      return editor?.isActive('textStyle', { fontFamily: font });
    });
  }, [editor]);
  const handleTextColorChange = (color: string) => {
    if (editor && editor.isEditable) {
      editor.chain().focus().setColor(color).run();
    }
  };
  const handleHighlightText = (color: string) => {
    if (editor && editor.isEditable) {
      editor.chain().focus().toggleHighlight({ color }).run();
    }
  };
  const handleBoldtext = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().toggleBold().run();
    }
  };
  const handleItalicText = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().toggleItalic().run();
    }
  };
  const handleStrikethroughText = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().toggleStrike().run();
    }
  };
  const handleCodeText = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().toggleCode().run();
    }
  };
  const handleUnderlineText = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().toggleUnderline().run();
    }
  };
  const handleBlockQuote = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().toggleBlockquote().run();
    }
  };
  const handleBulletList = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().toggleBulletList().run();
    }
  };
  const handleOrderedList = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().toggleOrderedList().run();
    }
  };
  const handleHorizontalRule = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().setHorizontalRule().run();
    }
  };
  const handleCodeBlock = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().toggleCodeBlock().run();
    }
  };
  const handleHardBreak = () => {
    if (editor && editor.isEditable) {
      editor.chain().focus().setHardBreak().run();
    }
  };
  return (
    <div className="flex gap-1 p-2 border border-primary border-solid">
      <FontStyleSelect
        handleFontChange={handleFontChange}
        selectedFont={selectedFont() as TFontStyle}
      />
      {headingLevels.map(({ level, Icon }) => (
        <ToolbarIconButton
          key={level}
          handleClick={() => handleToggleHeading(level)}
          isActive={activeHeading === level}
        >
          <Icon />
        </ToolbarIconButton>
      ))}
      <ColorPicker
        handleChange={handleTextColorChange}
        selectedColor={editor?.getAttributes('textStyle').color}
      >
        <TextColorIcon
          style={{ fill: editor?.getAttributes('textStyle').color }}
        />
      </ColorPicker>
      <ColorPicker
        handleChange={handleHighlightText}
        selectedColor={editor?.getAttributes('highlight').color}
      >
        <HighlightIcon
          style={{
            fill: editor?.getAttributes('highlight').color,
          }}
        />
      </ColorPicker>
      <ToolbarIconButton
        handleClick={handleBoldtext}
        isActive={!!editor?.isActive('bold')}
      >
        <BoldIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={handleItalicText}
        isActive={!!editor?.isActive('italic')}
      >
        <ItalicIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={handleStrikethroughText}
        isActive={!!editor?.isActive('strike')}
      >
        <StrikethroughIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={handleCodeText}
        isActive={!!editor?.isActive('code')}
      >
        <CodeIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={handleUnderlineText}
        isActive={!!editor?.isActive('underline')}
      >
        <UnderlineIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={handleBlockQuote}
        isActive={!!editor?.isActive('blockquote')}
      >
        <QuoteIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={handleBulletList}
        isActive={!!editor?.isActive('bulletList')}
      >
        <BulletListIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={handleOrderedList}
        isActive={!!editor?.isActive('orderedList')}
      >
        <NumberedListIcon />
      </ToolbarIconButton>
      <ToolbarIconButton handleClick={handleHorizontalRule} isActive={false}>
        <HorizontalRuleIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={handleCodeBlock}
        isActive={!!editor?.isActive('codeBlock')}
      >
        <CodeBlockIcon />
      </ToolbarIconButton>
      <ToolbarIconButton handleClick={handleHardBreak} isActive={false}>
        <LineBreakIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={() =>
          editor?.isEditable && editor?.chain().focus().undo().run()
        }
        isActive={false}
      >
        <UndoIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={() =>
          editor?.isEditable && editor?.chain().focus().redo().run()
        }
        isActive={false}
      >
        <RedoIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        handleClick={() =>
          editor?.isEditable &&
          editor?.chain().focus().unsetAllMarks().clearNodes().run()
        }
        isActive={false}
      >
        <FaRemoveFormat />
      </ToolbarIconButton>
    </div>
  );
};
export default Toolbar;
