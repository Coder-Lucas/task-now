"use client";

type TNextGlobalErrorProps = {
    readonly error: Error;
    readonly reset: () => unknown;
};

const NextGlobalError = ({ error, reset }: TNextGlobalErrorProps) => {
    return (
        <html className="bg-zinc-50 text-base scheme-light-dark dark:bg-zinc-950" dir="ltr" lang="zh-Hans-CN">
            <head />
            <body className="mt-16 flow-root font-serif text-zinc-950 dark:text-zinc-50">
                <main>
                    <h1>出现了未知错误</h1>
                    <p>{error.message}</p>
                    <button onClick={reset} type="button">
                        重试
                    </button>
                </main>
            </body>
        </html>
    );
};

export default NextGlobalError;
