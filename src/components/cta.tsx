"use client";

import { useRouter } from "next/navigation";

const CTA = () => {
    const router = useRouter();

    const navToFn = () => {
        router.push("/fn");
    };

    const navToDocs = () => {
        router.push("/docs");
    };

    return (
        <ul className="flex items-center justify-center gap-4 pt-16">
            <li className="rounded-lg bg-indigo-700 shadow shadow-indigo-500/50 transition-shadow duration-200 ease-in-out hover:shadow-xl dark:bg-indigo-300">
                <button className="rounded-lg px-8 py-4 text-lg text-zinc-50 dark:text-zinc-950" onClick={navToFn} type="button">
                    开始写作
                </button>
            </li>
            <li className="rounded-lg border border-zinc-300 transition-colors duration-200 ease-in-out hover:border-zinc-500 hover:bg-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-700">
                <button className="rounded-lg px-8 py-4 text-lg" onClick={navToDocs} type="button">
                    查看文档
                </button>
            </li>
        </ul>
    );
};

export default CTA;
