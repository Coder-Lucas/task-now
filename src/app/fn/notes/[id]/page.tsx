"use client";

import MarkdownEditor from "#/markdown-editor.tsx";
import MarkdownViewer from "#/markdown-viewer.tsx";
import { retrieveNote, softDeleteNote, TNote, updateNote } from "@lib/db.ts";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiArrowLeft, HiCheck, HiPencil, HiTrash } from "react-icons/hi2";

type TNoteDetailPageProps = {
    readonly params: Promise<{ readonly id: string }>;
};

const Note = ({ params }: TNoteDetailPageProps) => {
    const router = useRouter();
    const [id, setId] = useState<string>("");
    const [note, setNote] = useState<TNote | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 从 params 获取笔记 ID
    useEffect(() => {
        params.then((p) => setId(p.id));
    }, [params]);

    // 获取笔记数据
    useEffect(() => {
        if (!id) return;

        const loadNote = async () => {
            try {
                const noteData = await retrieveNote(id);
                if (!noteData || noteData.deletedAt !== null) {
                    notFound();
                }
                setNote(noteData);
                setEditTitle(noteData.name);
                setEditContent(noteData.text);
            } catch (error) {
                console.error("获取笔记失败:", error);
                notFound();
            } finally {
                setIsLoading(false);
            }
        };

        loadNote().then();
    }, [id]);

    // 处理保存编辑
    const handleSave = async () => {
        if (!note) return;

        setIsSaving(true);
        try {
            await updateNote(note.id, {
                name: editTitle.trim() || "无标题",
                text: editContent
            });

            // 更新本地状态
            setNote({
                ...note,
                name: editTitle.trim() || "无标题",
                text: editContent
            });

            setIsEditing(false);
        } catch (error) {
            console.error("保存失败:", error);
            alert("保存失败，请重试");
        } finally {
            setIsSaving(false);
        }
    };

    // 处理删除（软删除到回收站）
    const handleDelete = async () => {
        if (!note) return;

        if (!confirm("确定要将此笔记移到回收站吗？")) return;

        try {
            await softDeleteNote(note.id);
            router.push("/fn");
        } catch (error) {
            console.error("删除失败:", error);
            alert("删除失败，请重试");
        }
    };

    // 取消编辑
    const handleCancelEdit = () => {
        if (note) {
            setEditTitle(note.name);
            setEditContent(note.text);
        }
        setIsEditing(false);
    };

    // 返回列表
    const handleBack = () => {
        router.push("/fn");
    };

    // 格式化时间显示
    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleString("zh-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // 加载状态
    if (isLoading) {
        return (
            <main className="mt-8 flow-root min-h-screen px-4 pb-24">
                <div className="mx-auto max-w-4xl animate-pulse space-y-6">
                    <div className="h-8 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-96 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
            </main>
        );
    }

    // 笔记不存在
    if (!note) {
        return notFound();
    }

    return (
        <main className="mt-8 min-h-screen px-4 pb-24">
            <div className="mx-auto max-w-6xl">
                <header className="mb-6 flex items-center justify-between">
                    <button onClick={handleBack} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                        <HiArrowLeft size="18" />
                        返回
                    </button>

                    {!isEditing ? (
                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsEditing(true)} className="inline-flex items-center gap-2 rounded-lg bg-indigo-700 px-6 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-indigo-800 dark:bg-indigo-300 dark:text-zinc-950 dark:hover:bg-indigo-400">
                                <HiPencil size="18" />
                                编辑
                            </button>
                            <button onClick={handleDelete} className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950">
                                <HiTrash size="18" />
                                删除
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button onClick={handleCancelEdit} className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                                取消
                            </button>
                            <button onClick={handleSave} disabled={isSaving} className="inline-flex items-center gap-2 rounded-lg bg-indigo-700 px-6 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-indigo-800 disabled:opacity-50 dark:bg-indigo-300 dark:text-zinc-950 dark:hover:bg-indigo-400">
                                <HiCheck size="18" />
                                {isSaving ? "保存中..." : "保存"}
                            </button>
                        </div>
                    )}
                </header>

                {!isEditing ? (
                    <section className="mb-6">
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{note.name}</h1>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">最后修改: {formatTime(note.time)}</p>
                    </section>
                ) : (
                    <section className="mb-6">
                        <input type="text" className="w-full rounded-lg bg-zinc-100 p-4 text-2xl font-bold text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-zinc-900 dark:text-zinc-50" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="笔记标题..." />
                    </section>
                )}

                {!isEditing ? (
                    <div className="rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
                        <MarkdownViewer content={note.text} />
                    </div>
                ) : (
                    <div className="h-[calc(100vh-280px)] min-h-[400px]">
                        <MarkdownEditor initialContent={editContent} />
                    </div>
                )}
            </div>
        </main>
    );
};

export default Note;
