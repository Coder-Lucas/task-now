"use client";

import Dexie, { type Table } from "dexie";
import { v7 } from "uuid";

type TNote = {
    readonly id: string;
    readonly name: string;
    readonly text: string;
    readonly time: string;
    readonly deletedAt: string | null;
};

const TRASH_RETENTION_DAYS = 30;

class SharpNoteDB extends Dexie {
    notes: Table<TNote, string, TNote> = undefined!;

    constructor() {
        super("SharpNoteDB");
    }

    static uuid() {
        return v7();
    }

    // 仅在浏览器环境初始化数据库
    async init() {
        // 强制判断浏览器环境，避免Node.js执行
        if (typeof window === "undefined") {
            throw new Error("数据库只能在浏览器环境中初始化");
        }
        try {
            this.version(1).stores({
                notes: "id, name, text, time, deletedAt"
            });
            await this.open();
        } catch (e) {
            console.error(`ERROR: ${e}`);
            throw e;
        }
    }
}

// 单例模式：确保全局只存在一个数据库实例
let dbInstance: SharpNoteDB | null = null;

// 延迟初始化：第一次使用时才创建并初始化实例
async function getDB(): Promise<SharpNoteDB> {
    if (typeof window === "undefined") {
        throw new Error("数据库只能在浏览器环境中访问");
    }
    if (!dbInstance) {
        dbInstance = new SharpNoteDB();
        await dbInstance.init();
    }
    return dbInstance;
}

// 工具函数
const createTimestamp = () => new Date().toISOString();

// 重构所有数据库操作函数：通过 getDB() 获取实例后再操作
const createNote = async ({ name, text }: Pick<TNote, "name" | "text">): Promise<TNote | undefined> => {
    const db = await getDB();
    try {
        const note: TNote = {
            id: SharpNoteDB.uuid(),
            name,
            text,
            time: createTimestamp(),
            deletedAt: null
        };
        await db.notes.add(note);
        console.info("INFO: 笔记创建成功");
        return note;
    } catch (e) {
        console.error(`ERROR: ${e}`);
        throw e;
    }
};

const retrieveNote = async (id: string): Promise<TNote | undefined> => {
    const db = await getDB();
    try {
        const note = await db.notes.get(id);
        if (note) {
            console.info("INFO: 笔记获取成功");
        }
        return note;
    } catch (e) {
        console.error("获取笔记失败:", e);
        throw e;
    }
};

const retrieveNotes = async (): Promise<TNote[]> => {
    const db = await getDB();
    try {
        const notes = await db.notes.filter((note) => note.deletedAt === null).sortBy("time");
        return notes.reverse();
    } catch (e) {
        console.error(`ERROR: ${e}`);
        throw e;
    }
};

const retrieveDeletedNotes = async (): Promise<TNote[]> => {
    const db = await getDB();
    try {
        const notes = await db.notes.filter((note) => note.deletedAt !== null).sortBy("deletedAt");
        return notes.reverse();
    } catch (e) {
        console.error(`ERROR: ${e}`);
        throw e;
    }
};

const updateNote = async (id: string, { name, text }: Partial<Pick<TNote, "name" | "text">>): Promise<undefined> => {
    const db = await getDB();
    try {
        const note = await db.notes.get(id);
        if (!note) {
            throw new Error("笔记不存在");
        }
        const updated: TNote = {
            ...note,
            name: name ?? note.name,
            text: text ?? note.text,
            time: createTimestamp()
        };
        await db.notes.put(updated);
        console.info("INFO: 笔记更新成功");
    } catch (e) {
        console.error(`ERROR: ${e}`);
        throw e;
    }
};

const softDeleteNote = async (id: string): Promise<undefined> => {
    const db = await getDB();
    try {
        const note = await db.notes.get(id);
        if (!note) {
            throw new Error("笔记不存在");
        }
        const updated: TNote = { ...note, deletedAt: createTimestamp() };
        await db.notes.put(updated);
        console.info("INFO: 笔记已移至回收站");
    } catch (e) {
        console.error(`ERROR: ${e}`);
        throw e;
    }
};

const restoreNote = async (id: string): Promise<undefined> => {
    const db = await getDB();
    try {
        const note = await db.notes.get(id);
        if (!note) {
            throw new Error("笔记不存在");
        }
        const updated: TNote = { ...note, deletedAt: null };
        await db.notes.put(updated);
        console.info("INFO: 笔记已恢复");
    } catch (e) {
        console.error(`ERROR: ${e}`);
        throw e;
    }
};

const permanentlyDeleteNote = async (id: string): Promise<undefined> => {
    const db = await getDB();
    try {
        await db.notes.delete(id);
        console.info("INFO: 笔记已彻底删除");
    } catch (e) {
        console.error(`ERROR: ${e}`);
        throw e;
    }
};

const cleanExpiredNotes = async (): Promise<number> => {
    const db = await getDB();
    try {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - TRASH_RETENTION_DAYS);
        const cutoff = cutoffDate.toISOString();

        const expiredNotes = await db.notes.filter((note) => note.deletedAt !== null && note.deletedAt < cutoff).toArray();

        for (const note of expiredNotes) {
            await db.notes.delete(note.id);
        }

        const count = expiredNotes.length;
        if (count > 0) {
            console.info(`INFO: 已清理 ${count} 条过期笔记`);
        }
        return count;
    } catch (e) {
        console.error(`ERROR: ${e}`);
        throw e;
    }
};

const searchNotes = async (query: string): Promise<TNote[]> => {
    const db = await getDB();
    try {
        const allNotes = await db.notes.filter((note) => note.deletedAt === null).toArray();
        const lowerQuery = query.toLowerCase();
        const filtered = allNotes.filter((note) => note.name.toLowerCase().includes(lowerQuery) || note.text.toLowerCase().includes(lowerQuery));
        return filtered.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    } catch (e) {
        console.error(`ERROR: ${e}`);
        throw e;
    }
};

export { cleanExpiredNotes, createNote, getDB, permanentlyDeleteNote, restoreNote, retrieveDeletedNotes, retrieveNote, retrieveNotes, searchNotes, SharpNoteDB, softDeleteNote, updateNote };
export type { TNote };
