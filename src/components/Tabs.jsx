import { useState } from 'react';

function Tabs({ tabs, getTab }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index, tab) => {
        setActiveTab(index);
        getTab(tab)
    };

    return (
        <div className="flex justify-start mb-5">
            <div className="flex border-b-2 border-gray-300 w-full">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`py-2 px-4 font-semibold text-gray-600 border-b-2 border-transparent hover:border-gray-500 focus:outline-none ${activeTab === index ? 'selected' : ''}`}
                        onClick={() => handleTabClick(index, tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tabs;