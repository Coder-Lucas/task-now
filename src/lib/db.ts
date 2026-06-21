"use client";

import Dexie, { type Table } from "dexie";
import { v7 } from "uuid";

type TNote = {
    readonly id: string;
    readonly name: string;
    readonly text: string;
    readonly time: string;
};

class SharpNoteDB extends Dexie {
    public notes: Table<TNote, string, TNote> = null!;
    private static instance: SharpNoteDB = null!

    private constructor() {
        super("SharpNoteDB");
    }

    private async init() {
        try {
            this.version(1).stores({
                notes: "id, name, text, time"
            });

            await this.open();
            return void 0;
        } catch (e) {
            console.error(`ERROR: ${e}`);
            throw e;
        }
    }

    public static async get() {
        try {
            if (typeof window === "undefined" || typeof document === "undefined") {
                throw new Error("IndexedDB 只能在浏览器环境获取");
            }

            if (!this.instance) {
                this.instance = new SharpNoteDB();
                await this.instance.init();
            }

            return this.instance
        } catch (e) {
            console.error(`ERROR: ${e}`);
            throw e
        }
    }

    public static uuid() {
        return v7();
    }
}

export { SharpNoteDB };
export type { TNote };
