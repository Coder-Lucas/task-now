"use client";

type TNextErrorProps = {
    readonly error: Error;
    readonly reset: () => unknown;
};

const NextError = ({ error, reset }: TNextErrorProps) => {
    return (
        <main>
            <h1>出现了未知错误</h1>
            <p>{error.message}</p>
            <button onClick={reset} type="button">
                重试
            </button>
        </main>
    );
};

export default NextError;
