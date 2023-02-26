import api from '@/config/api'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { lowlight } from 'lowlight/lib/core'
import { useState } from 'react'
import Modal from './Modal'
import Menubar from './Tiptap/Menubar'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

const Editor = () => {
  const [element, setElement] = useState('Hello')
  const [hasErrors, setHasErrors] = useState(false)

  async function fixGrammer() {
    const content = editor.getText()

    const { data } = await api().get('grammer-check', {
      params: {
        text: content,
      },
    })
    console.log('grammer check ', data)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline.configure({
        HTMLAttributes: {
          class: 'my-custom-class',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: 'language-css',
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'my-custom-class',
        },
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
    ],
    content: element,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })

  return (
    <div>
      <Modal />
      <div className="md:mx-16">
        <div className="overflow-x-[overlay] sm:overflow-[inherit] overflow-y-hidden bg-gray-100 p-0.5 shadow-md md:bg-white md:shadow-none">
          <div className="flex w-[580px] flex-nowrap items-center text-[#666666] sm:w-full sm:flex-wrap md:justify-center">
            {editor && <Menubar editor={editor} />}
          </div>
        </div>

        <div className="editor-inner h-[30rem]">
          <EditorContent className="editor__content" editor={editor} />
          {/* <div className="editor__footer"></div> */}
        </div>
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-gray-500">23 words</span>
          </div>
          <button
            type="button"
            onClick={fixGrammer}
            className="mr-2 mb-2 w-[20%] rounded-full border border-pink-300 bg-gray-50 py-2.5 text-gray-600 shadow-md shadow-slate-200"
          >
            Check errors
          </button>
          <button
            type="button"
            className="mr-2 mb-2 w-[20%] rounded-full border border-green-300 py-2.5  text-gray-600 shadow-md shadow-slate-200"
          >
            Summerize text
          </button>
        </div>
      </div>
    </div>
  )
}

export default Editor
