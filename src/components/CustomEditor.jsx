import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { TRANSFORMERS } from '@lexical/markdown'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { $getRoot, $getSelection, createEditor } from 'lexical'
import ToolbarPlugin from '../plugins/ToolbarPlugin'
import ExampleTheme from '../themes/ExampleTheme'

import api from '@/config/api'
import { useState } from 'react'
import AutoLinkPlugin from '../plugins/AutoLinkPlugin'
import CodeHighlightPlugin from '../plugins/CodeHighlightPlugin'
import ListMaxIndentLevelPlugin from '../plugins/ListMaxIndentLevelPlugin'

function Placeholder() {
  return (
    <div className="editor-placeholder text-xs text-gray-300">
      Write your notes, journals with automatic grammar correction.
    </div>
  )
}

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
}

const editor = createEditor(editorConfig)

export default function Editor(props) {
  const [txt, setTxt] = useState('')

  // word count
  const [wordCount, setWordCount] = useState(0)

  const sendAPIRequest = async () => {
    console.log('text is', txt)
    const { data } = await api().get('grammer-check', {
      params: {
        text: txt,
      },
    })

    onChange()

    console.log('response is', data.choices[0].text)
  }

  function onChange(editorState) {
    editorState.read(() => {
      const root = $getRoot().__cachedText
      const words = root.split(' ')
      // update word count
      let wordCount = 0
      words.forEach((word) => {
        if (word.trim() !== '') {
          wordCount++
        }
      })
      setWordCount(wordCount)
      setTxt(root)
      const selection = $getSelection()
      console.log('selection is', selection)
    })
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="md:mx-16">
        <div className="overflow-x-[overlay] sm:overflow-[inherit] overflow-y-hidden bg-gray-100 p-0.5 shadow-md md:bg-white md:shadow-none">
          <div className="flex w-[580px] flex-nowrap items-center text-[#666666] sm:w-full sm:flex-wrap md:justify-center">
            <ToolbarPlugin />
          </div>
        </div>

        <div className="editor-inner h-[30rem]">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-gray-500">{wordCount} words</span>
          </div>
          <button
            type="button"
            onClick={sendAPIRequest}
            className="mr-2 mb-2 w-[20%] rounded-full border border-pink-300 bg-gray-50 py-2.5 text-gray-600 shadow-md shadow-slate-200"
          >
            Fix errors
          </button>
          <button
            type="button"
            className="mr-2 mb-2 w-[20%] rounded-full border border-green-300 py-2.5  text-gray-600 shadow-md shadow-slate-200"
          >
            Summerize text
          </button>
        </div>
      </div>
    </LexicalComposer>
  )
}
