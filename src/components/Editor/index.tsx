import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Code from '@tiptap/extension-code';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import CodeBlock from '@tiptap/extension-code-block';
import HardBreak from '@tiptap/extension-hard-break';
import CharacterCount from '@tiptap/extension-character-count';

import { Color } from '@tiptap/extension-color';

import Toolbar from '../Toolbar';
import Count from './Count';
import { observer } from 'mobx-react-lite';
import editorStore from '@/store/editor.store';
import { useEffect, useRef } from 'react';
import { getCumulativeSteps } from '@/utils/editor.utils';

const extensions = [
  StarterKit.configure({
    heading: false,
    code: false,
    blockquote: false,
    bulletList: false,
    orderedList: false,
    listItem: false,
    horizontalRule: false,
    codeBlock: false,
    hardBreak: false,
  }),
  Heading.extend({
    addAttributes() {
      return {
        level: {
          default: 1,
        },
        class: {
          default: null,
          renderHTML: (attributes) => {
            const level = attributes.level;
            const classes: Record<number, string> = {
              1: 'text-4xl font-extrabold',
              2: 'text-3xl font-bold',
              3: 'text-2xl font-semibold',
              4: 'text-xl font-medium',
              5: 'text-lg font-normal',
            };
            return {
              class: classes[level] || 'text-base font-normal',
            };
          },
        },
      };
    },
  }),
  FontFamily,
  TextStyle,
  Color,
  Code.configure({
    HTMLAttributes: {
      class: 'bg-tertiary rounded-md p-2 text-tertiary',
    },
  }),
  Underline,
  Highlight.configure({
    multicolor: true,
    HTMLAttributes: { class: 'rounded-md p-1' },
  }),
  Blockquote.configure({
    HTMLAttributes: {
      class: 'border-l-2 pl-4 italic text-secondary border-primary',
    },
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: 'list-disc pl-6',
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: 'list-decimal pl-6',
    },
  }),
  ListItem.configure({
    HTMLAttributes: {
      class: 'pl-2',
    },
  }),
  HorizontalRule.configure({
    HTMLAttributes: {
      class: 'border-t-2 border-primary my-4',
    },
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: 'bg-tertiary rounded-md p-2 text-tertiary',
    },
  }),
  HardBreak.configure({
    HTMLAttributes: {
      class: 'my-2',
    },
  }),
  CharacterCount,
];

const content = '<p></p>';
const Tiptap = () => {
  const isApplyingSteps = useRef(false);

  const editor = useEditor({
    extensions,
    content: content,
    editable: true,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none',
      },
    },
    onTransaction: ({ transaction }) => {
      if (isApplyingSteps.current) return;

      const { steps } = transaction;
      if (steps.length > 0) {
        editorStore.addSteps(steps);
      }
    },
  });

  useEffect(() => {
    if (editor && editorStore.currentVersion) {
      isApplyingSteps.current = true;
      editor.commands.setContent('<p></p>');
      const steps = getCumulativeSteps(
        editorStore.currentVersionId,
        editorStore.versions
      );
      const { state, view } = editor;
      const tr = state.tr;

      steps.forEach((step) => {
        tr.step(step);
      });

      view.dispatch(tr);

      isApplyingSteps.current = false;
    }
  }, [editorStore.currentVersionId, editor]);
  useEffect(() => {
    if (editor) {
      const isEditable =
        editorStore.currentVersionId ===
        editorStore.currentBranch?.headVersionId;
      editor.setOptions({
        editable: isEditable,
      });
      if (isEditable) {
        editor.commands.focus('end');
      }
    }
  }, [editorStore.currentVersionIndex, editorStore.currentBranch, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex flex-col h-full text-primary border-2 border-primary rounded-md relative">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="flex-1 p-4 overflow-y-auto bg-primary"
      />
      <div className="absolute top-[-2rem] right-0">
        <Count editor={editor} />
      </div>
    </div>
  );
};

export default observer(Tiptap);
