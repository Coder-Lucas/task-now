import Card from "#/card.tsx";
import CTA from "#/cta.tsx";
import { HiOutlineCheckCircle, HiOutlineCode, HiOutlineCube, HiOutlineLightningBolt } from "react-icons/hi";

const Index = () => {
    return (
        <main>
            <section className="mt-32 flex flex-col items-center justify-center gap-4 p-4">
                <h1 className="text-5xl font-bold text-indigo-700 dark:text-indigo-300">SharpNote</h1>
                <h2 className="text-xl">SharpNote：你的Markdown专属写作空间。</h2>
                <CTA />
            </section>
            <section className="mt-32 grid grid-cols-2 grid-rows-2 gap-4 p-4">
                <Card icon={<HiOutlineCube size="48" />} title="极简设计，操作直观，">
                    专注于写作本身。
                </Card>
                <Card icon={<HiOutlineLightningBolt size="48" />} title="响应迅速，即开即用，">
                    捕捉每一个灵感瞬间。
                </Card>
                <Card icon={<HiOutlineCheckCircle size="48" />} title="隐私安全，本地存储，">
                    所有数据全部存储于浏览器。
                </Card>
                <Card icon={<HiOutlineCode size="48" />} title="完全开源，永久免费，">
                    开启你的写作之旅。
                </Card>
            </section>
        </main>
    );
};

export default Index;
