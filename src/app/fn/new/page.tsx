"use client";

import MarkdownEditor from "#/markdown-editor.tsx";
import { createNote } from "@lib/db.ts";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { HiArrowLeft, HiCheck } from "react-icons/hi2";

const NewNotePage: FC = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // 处理保存笔记
    const handleSave = async () => {
        // 验证输入
        if (!title.trim() && !content.trim()) {
            alert("请输入标题或内容");
            return;
        }

        setIsSaving(true);
        try {
            const note = await createNote({
                name: title.trim() || "无标题",
                text: content
            });
            if (note) {
                router.push(`/fn/notes/${note.id}`);
            }
        } catch (error) {
            console.error("保存失败:", error);
            alert("保存失败，请重试");
        } finally {
            setIsSaving(false);
        }
    };

    // 返回列表页
    const handleBack = () => {
        router.push("/fn");
    };

    return (
        <main className="mt-8 min-h-screen px-4 pb-24">
            <div className="mx-auto max-w-6xl">
                <header className="mb-6 flex items-center justify-between">
                    <button onClick={handleBack} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                        <HiArrowLeft size="18" />
                        返回
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="inline-flex items-center gap-2 rounded-lg bg-indigo-700 px-6 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-indigo-800 disabled:opacity-50 dark:bg-indigo-300 dark:text-zinc-950 dark:hover:bg-indigo-400">
                        <HiCheck size="18" />
                        {isSaving ? "保存中..." : "保存"}
                    </button>
                </header>

                <section className="mb-6">
                    <input type="text" className="w-full rounded-lg bg-zinc-100 p-4 text-2xl font-bold text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-zinc-900 dark:text-zinc-50" placeholder="笔记标题..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </section>

                <section className="h-[calc(100vh-250px)] min-h-[400px]">
                    <MarkdownEditor initialContent={content} />
                </section>
            </div>
        </main>
    );
};

export default NewNotePage;
