// src/components/ChatInput.tsx
import React, { useState } from 'react';
import EmojiPicker from './emojipicker';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    // 메시지 전송 함수(handleSubmit)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
            setShowEmojiPicker(false);
        }
    };

    const handleSelectEmoji = (emoji: string) => {
        setMessage((prev) => prev + emoji);
        setShowEmojiPicker(false);
    };

    return (
        <div className="relative">
            {showEmojiPicker && (
                <div className="absolute bottom-16 left-0">
                    <EmojiPicker onSelectEmoji={handleSelectEmoji} />
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex p-2 border-t border-gray-300">
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="mr-2 text-2xl"
                >
                    😀
                </button>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow p-2 border rounded-lg"
                    placeholder="메시지를 입력하세요..."
                />
                <button type="submit" className="ml-2 px-4 py-2 bg-red-300 text-white rounded-lg">
                    전송
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
