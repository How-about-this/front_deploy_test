'use client';

import { useState } from 'react';
import Image from 'next/image';
import PurchaseModal from '@/app/(route)/modal/@modal/shop/PurchaseModal';

interface Item {
    id: number;
    name: string;
    price: number;
    endpoint: string;
    image: string;
}

interface ItemPurchaseProps {
    userZem: number;
}

const items: Item[] = [
    { id: 1, name: '채팅 시간 늘리기 (24시간)', price: 100, endpoint: '/get/LongSword', image: '/itemImages/longsword.png' },
    { id: 2, name: '채팅방 추가', price: 500, endpoint: '/get/Bow', image: '/itemImages/bow.png' },
    { id: 3, name: '채팅 다시 요청하기', price: 1000, endpoint: '/get/Hammer', image: '/itemImages/hammer.png' },
    { id: 4, name: '슈퍼하트', price: 2500, endpoint: '/get/Blade', image: '/itemImages/blade.png' },
];

const ItemPurchase: React.FC<ItemPurchaseProps> = ({ userZem }) => {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleItemClick = (item: Item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold text-center mb-8">게임 아이템 상점</h1>
            <div className="grid grid-cols-2 gap-10 max-w-4xl mx-auto">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center border-2 p-4 rounded-lg cursor-pointer"
                        onClick={() => handleItemClick(item)}
                    >
                        <Image src={item.image} alt={item.name} width={100} height={100} />
                        <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
                        <p className="text-lg mt-2">{item.price} ZEM</p>
                    </div>
                ))}
            </div>
            {isModalOpen && selectedItem && (
                <PurchaseModal item={selectedItem} onClose={closeModal} userZem={userZem} />
            )}
        </div>
    );
};

export default ItemPurchase;
