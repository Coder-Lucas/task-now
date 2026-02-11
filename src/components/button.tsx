"use client";

import { type ReactNode } from "react";

type TButtonProps = {
    readonly children?: ReactNode;
    readonly onClick?: () => unknown;
};

const Button = ({ children = null, onClick = () => {} }: TButtonProps) => {
    return (
        <button className="rounded-lg border border-zinc-300 px-8 py-4 transition-colors hover:border-zinc-500 hover:bg-zinc-300 dark:border-zinc-700 dark:text-indigo-300 dark:hover:bg-zinc-700" onClick={onClick} type="button">
            {children}
        </button>
    );
};

export default Button;
