"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineCog, HiOutlineDocumentText, HiOutlineHome, HiOutlineInformationCircle } from "react-icons/hi";

type TItemProps = {
    readonly children?: React.ReactNode;
    readonly href?: string;
};

const Item = ({ children = null, href = "about:blank" }: TItemProps) => {
    return (
        <li className="h-16">
            <Link className="relative flex h-16 items-center justify-center transition-colors duration-200 ease-in-out before:absolute before:top-full before:bottom-0 before:left-1/2 before:z-20 before:h-px before:w-0 before:-translate-x-1/2 before:bg-indigo-700 before:transition-all before:duration-200 before:ease-in-out hover:text-indigo-700 hover:before:w-16 dark:before:bg-indigo-300 dark:hover:text-indigo-300" href={href} prefetch={true}>
                {children}
            </Link>
        </li>
    );
};

const Header = () => {
    return (
        <header className="fixed top-0 right-0 left-0 z-10 h-16 w-full bg-zinc-50/50 backdrop-blur-xs backdrop-saturate-150 dark:bg-zinc-950/50">
            <ul className="flex h-16 w-full items-center justify-around">
                <Item href="/">
                    <Image alt="favicon" height={48} preload={true} src="/favicon.svg" width={48} />
                </Item>
                <Item href="/fn">
                    <HiOutlineHome size="24" />
                </Item>
                <Item href="/settings">
                    <HiOutlineCog size="24" />
                </Item>
                <Item href="/about">
                    <HiOutlineInformationCircle size="24" />
                </Item>
                <Item href="/docs">
                    <HiOutlineDocumentText size="24" />
                </Item>
            </ul>
        </header>
    );
};

export default Header;
