"use client";

import { useState } from "react";
import MarkdownViewer from "./markdown-viewer";

type TMarkdownEditorProps = {
    readonly initialContent?: string;
};

const MarkdownEditor = ({ initialContent = "" }: TMarkdownEditorProps) => {
    const [content, setContent] = useState(initialContent);

    return (
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
            <textarea className="h-96 w-full rounded-lg bg-zinc-100 p-4 leading-relaxed caret-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none lg:h-full dark:bg-zinc-900" value={content ?? ""} onChange={(e) => setContent(e.target.value)} placeholder="在此输入 Markdown 内容..." />
            <div className="h-96 w-full overflow-auto rounded-lg border border-zinc-200 bg-white p-4 lg:h-full dark:border-zinc-800 dark:bg-zinc-950">
                <MarkdownViewer content={content || "预览内容将显示在这里"} />
            </div>
        </div>
    );
};

export default MarkdownEditor;
