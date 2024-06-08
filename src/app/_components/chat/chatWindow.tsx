// 웹소켓 연결 컴포넌트

import React, { useEffect, useState } from 'react';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import { fetchMessages, sendMessage } from '../../api/chatApi';
import { connectWebSocket, sendMessageWebSocket, disconnectWebSocket } from '../../api/websocket';

interface ChatWindowProps {
    chatId: string;
}

interface Message {
    roomId: string;
    content: string;
    isOwnMessage: boolean;
    timestamp: string;
}


const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const loadMessages = async () => {
            const messages = await fetchMessages(chatId);
            setMessages(messages);
        };
        loadMessages();

        const handleNewMessage = (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        // WebSocket 연결 설정
        connectWebSocket(`wss://your-websocket-server.com/chat/${chatId}`, handleNewMessage);

        return () => {
            disconnectWebSocket();
        };
    }, [chatId]);

    // 미시지 전송 및 상태 업데이트 
    const handleSendMessage = async (message: string) => {
        const newMessage = { roomId: chatId, content: message, isOwnMessage: true, timestamp: new Date().toLocaleTimeString() };

        // 기존 메시지 목록에 새로운 메시지 추가
        // 즉, 새로운 메시지가 도착할 때마다 메시지 목록이 갱신되어 화면에 표시됨
        setMessages((prevMessages) => [...prevMessages, newMessage]); // 스프레드 연산자를 이용하여 prevMessages의 모든 요소를 복사 후 그 뒤에 newMessage를 추가하는 배열 생성

        sendMessageWebSocket(newMessage);
        await sendMessage({ roomId: chatId, content: message });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg.content} isOwnMessage={msg.isOwnMessage} timestamp={msg.timestamp} />
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;