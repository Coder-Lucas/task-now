"use client";

import { type ReactNode } from "react";

type TCardProps = {
    readonly children?: ReactNode;
    readonly icon?: ReactNode;
    readonly title?: ReactNode;
};

const Card = ({ children = null, icon = null, title = null }: TCardProps) => {
    return (
        <article className="rounded-lg bg-zinc-100 p-4 text-indigo-700 transition-colors duration-200 ease-in-out hover:bg-zinc-200 dark:bg-zinc-900 dark:text-indigo-300 dark:hover:bg-zinc-800">
            {icon}
            <h3 className="pt-4 text-lg font-bold text-zinc-950 dark:text-zinc-50">{title}</h3>
            <p className="text-zinc-950 dark:text-zinc-50">{children}</p>
        </article>
    );
};

export default Card;
