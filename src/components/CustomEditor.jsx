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
import { $getRoot, $getSelection } from 'lexical'
import ToolbarPlugin from '../plugins/ToolbarPlugin'
import ExampleTheme from '../themes/ExampleTheme'

import { useEffect, useState } from 'react'
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

export default function Editor(props) {
  const [count, setCount] = useState(0)

  const [txt, setTxt] = useState('')

  useEffect(() => {
    // Update the document title using the browser API
    console.log(`You clicked ${count} times`)
  })

  function sendAPIRequest() {
    console.log('text is', txt)
  }

  // When the editor changes, you can get notified via the
  // LexicalOnChangePlugin!
  function onChange(editorState) {
    editorState.read(() => {
      console.log('coount is', count)
      // Read the contents of the EditorState here.
      const root = $getRoot().__cachedText
      setTxt(root)
      const selection = $getSelection()
      console.log('my state is', root)
    })
  }

  const handleClick = () => {
    props.handleData('some data')
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="md:mx-16">
        <div className="overflow-x-[overlay] sm:overflow-[inherit] overflow-y-hidden bg-gray-100 p-0.5 shadow-md md:bg-white md:shadow-none">
          <div className="flex w-[580px] flex-nowrap items-center text-[#666666] sm:w-full sm:flex-wrap md:justify-center">
            <ToolbarPlugin />
          </div>
        </div>

        <div className="editor-inner">
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
        <div className="flex w-full items-center justify-center pt-44">
          <button
            type="button"
            onClick={sendAPIRequest}
            class="mr-2 mb-2 w-[50%] rounded-lg bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-pink-500/50 hover:bg-gradient-to-br focus:outline-none dark:shadow-lg dark:shadow-pink-800/80 dark:focus:ring-pink-800"
          >
            Click to Correct
          </button>
        </div>
      </div>
    </LexicalComposer>
  )
}
