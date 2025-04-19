import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import HardBreak from '@tiptap/extension-hard-break'
import Paragraph from '@tiptap/extension-paragraph'
import { GoListOrdered } from "react-icons/go";
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { useEffect } from 'react'
import '../../../../public/TiptapStyles.css'
import { Button } from '@/components/ui/button'
import { Bold, Heading1, Heading2Icon, Heading3Icon, Italic, QuoteIcon, Redo, Strikethrough, UnderlineIcon, Undo } from 'lucide-react'
import { MdClear, MdFormatListBulleted, MdOutlineInsertPageBreak } from 'react-icons/md'
import { FaParagraph } from 'react-icons/fa'

export default function TiptapEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [StarterKit, Underline, Strike, CodeBlock, Blockquote, HardBreak, Paragraph, TextStyle, Color],
        content: content || '<p>Start writing your blog...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none p-4',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(content)
        }
    }, [editor, content])

    return (
        <div className="border border-gray-300 rounded-md dark:bg-transparent">
            <div className="flex flex-wrap gap-2 p-2 border-b dark:text-white text-sm">
                <Button className="bg-transprent text-black dark:text-white  hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleBold().run()}><Bold /></Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleItalic().run()}><Italic /></Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon /></Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough /></Button>

                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleCode().run()}>Inline Code</Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code Block</Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleBlockquote().run()}><QuoteIcon /></Button>

                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 /></Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2Icon /></Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3Icon /></Button>

                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleBulletList().run()}><MdFormatListBulleted /></Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().toggleOrderedList().run()}><GoListOrdered /></Button>

                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().setParagraph().run()}><FaParagraph /></Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().setHardBreak().run()}><MdOutlineInsertPageBreak /></Button>

                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().undo().run()}><Undo /></Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().redo().run()}><Redo /></Button>

                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer" onClick={() => editor.chain().focus().clearNodes().run()}><MdClear /></Button>
                <Button className="bg-transprent text-black dark:text-white hover:bg-transparent cursor-pointer">
                    {editor && (
                        <input
                            type="color"
                            onInput={(event) =>
                                editor.chain().focus().setColor(event.target.value).run()
                            }
                            value={editor.getAttributes('textStyle').color || '#000000'}
                        />
                    )}
                </Button>

            </div>

            <EditorContent editor={editor} />
        </div>
    )
}
