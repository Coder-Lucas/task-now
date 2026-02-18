"use client";

type TButtonProps = {
    readonly children?: React.ReactNode;
    readonly onClick?: () => unknown;
};

const Button = ({ children = null, onClick = () => {} }: TButtonProps) => {
    return (
        <button className="rounded-full bg-indigo-700 p-4 text-zinc-50 transition-transform duration-200 ease-in-out hover:scale-110 dark:bg-indigo-300 dark:text-zinc-950" onClick={onClick} type="button">
            {children}
        </button>
    );
};

export default Button;
