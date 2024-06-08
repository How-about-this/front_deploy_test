// src/app/(route)/chat/[chatId]/page.tsx
"use client"
import ChatWindow from '../../_components/chat/chatWindow';
import { FC } from 'react';

interface ChatPageProps {
    params: {
        chatId: string;
    };
}
const ChatPage: FC<ChatPageProps> = ({ params }) => {
    const { chatId } = params;

    return (
        <div className="flex flex-col h-screen">
            <ChatWindow chatId={chatId} />
        </div>
    );
};

export default ChatPage;
