import { Editor } from '@tiptap/react';
import { useMemo } from 'react';

type TCount = {
  editor: Editor;
};
const Count = ({ editor }: TCount) => {
  const text = editor.getText();
  const { characterCount, wordCount } = useMemo(() => {
    const characterCount = text.length;
    const wordCount = text
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return { characterCount, wordCount };
  }, [text]);
  return (
    <div className="flex font-bold text-xs text-info p-2">
      <span>{characterCount} Characters</span>(<span>{wordCount} Words</span>)
    </div>
  );
};
export default Count;
