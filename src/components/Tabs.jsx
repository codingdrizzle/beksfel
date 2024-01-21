import { useRouter } from 'next/router';

function Tabs({ tabs }) {
    const router = useRouter();
    const handleTabClick = (tab) => router.push(tab.route);

    return (
        <div className="flex justify-start mb-5">
            <div className="flex border-b-2 border-gray-300 w-full">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`py-2 px-4 font-semibold text-gray-600 border-b-2 border-transparent hover:border-gray-500 focus:outline-none ${router.pathname === tab.route ? 'selected' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tabs;