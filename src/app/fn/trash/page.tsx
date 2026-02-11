"use client";

import { permanentlyDeleteNote, restoreNote, retrieveDeletedNotes, type TNote } from "@lib/db.ts";
import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiArrowUturnLeft, HiTrash } from "react-icons/hi2";

const DeletedNoteCard = ({ note }: { readonly note: TNote }) => {
    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleString("zh-Hans-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getDaysUntilDeletion = (deletedAt: string) => {
        const deleted = new Date(deletedAt);
        const expiration = new Date(deleted);
        expiration.setDate(expiration.getDate() + 30);
        const now = new Date();
        const diff = Math.ceil((expiration.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const daysLeft = getDaysUntilDeletion(note.deletedAt!);

    const handleRestore = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await restoreNote(note.id);
        } catch (error) {
            console.error("恢复失败:", error);
            alert("恢复失败，请重试");
        }
    };

    const handlePermanentDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!confirm("确定要彻底删除此笔记吗？此操作不可恢复。")) return;

        try {
            await permanentlyDeleteNote(note.id);
        } catch (error) {
            console.error("彻底删除失败:", error);
            alert("删除失败，请重试");
        }
    };

    const previewText = note.text.slice(0, 100) + (note.text.length > 100 ? "..." : "");

    return (
        <article className="relative rounded-lg bg-zinc-100 p-6 dark:bg-zinc-900">
            <h3 className="mb-2 truncate text-xl font-bold text-zinc-900 dark:text-zinc-50">{note.name || "无标题"}</h3>
            <p className="mb-4 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">{previewText}</p>

            <div className="mb-4 flex items-center justify-between text-xs text-zinc-400">
                <span>删除于: {formatTime(note.deletedAt!)}</span>
                <span className={daysLeft <= 3 ? "text-red-500" : ""}>{daysLeft > 0 ? `${daysLeft} 天后彻底删除` : "即将被清空"}</span>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={handleRestore} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                    <HiArrowUturnLeft size="16" />
                    恢复
                </button>
                <button onClick={handlePermanentDelete} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950">
                    <HiTrash size="16" />
                    彻底删除
                </button>
            </div>
        </article>
    );
};

const EmptyTrashState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-zinc-100 p-6 dark:bg-zinc-900">
                <HiTrash className="h-12 w-12 text-zinc-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">回收站为空</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">删除的笔记将显示在这里</p>
        </div>
    );
};

const Trash = () => {
    const router = useRouter();

    const deletedNotes = useLiveQuery(async () => {
        return await retrieveDeletedNotes();
    });

    const handleBack = () => {
        router.push("/fn");
    };

    const renderNotes = () => {
        if (!deletedNotes) {
            return (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse rounded-lg bg-zinc-100 p-6 dark:bg-zinc-900">
                            <div className="mb-4 h-6 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="mb-4 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                    ))}
                </div>
            );
        }

        if (deletedNotes.length === 0) {
            return <EmptyTrashState />;
        }

        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {deletedNotes.map((note) => (
                    <DeletedNoteCard key={note.id} note={note} />
                ))}
            </div>
        );
    };

    return (
        <main className="mt-8 min-h-screen px-4 pb-24">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 flex items-center gap-4">
                    <button onClick={handleBack} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                        <HiArrowLeft size="18" />
                        返回
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">回收站</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">笔记将在 30 天后自动清空</p>
                    </div>
                </header>

                {renderNotes()}
            </div>
        </main>
    );
};

export default Trash;
