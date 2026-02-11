"use client";

import Markdown from "react-markdown";
import Sanitize from "rehype-sanitize";
import Gfm from "remark-gfm";

type TMarkdownViewerProps = {
    readonly content?: string;
};

const MarkdownViewer = ({ content = "" }: TMarkdownViewerProps) => {
    return (
        <article className="markdown-body">
            <Markdown rehypePlugins={[Sanitize]} remarkPlugins={[Gfm]}>
                {content}
            </Markdown>
        </article>
    );
};

export default MarkdownViewer;
