"use client";

import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

type TSearchInputProps = {
    readonly onSearch: (query: string) => void;
    readonly placeholder?: string;
};

const SearchInput = ({ onSearch, placeholder = "搜索笔记..." }: TSearchInputProps) => {
    const [query, setQuery] = useState("");

    const handleChange = (value: string) => {
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="relative w-full">
            <HiMagnifyingGlass className="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400" size="20" />
            <input type="text" className="w-full rounded-lg border border-zinc-200 bg-zinc-100 py-3 pr-4 pl-12 transition-all focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900" placeholder={placeholder} value={query} onChange={(e) => handleChange(e.target.value)} />
        </div>
    );
};

export default SearchInput;
