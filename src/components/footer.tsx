"use client";

type TTextProps = {
    readonly children?: React.ReactNode;
};

const Text = ({ children }: TTextProps) => {
    return <small className="text-sm text-zinc-50 dark:text-zinc-950">{children}</small>;
};

const Footer = () => {
    return (
        <footer className="mt-32 flex h-24 w-full items-center justify-center gap-4 bg-indigo-700 dark:bg-indigo-300">
            <Text>The MIT License (MIT)</Text>
            <Text>Copyright &copy; 2025-2026 Lucas</Text>
        </footer>
    );
};

export default Footer;
