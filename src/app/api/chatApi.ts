// src/api/chatApi.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// 채팅 나가기
export const leaveChatRoom = async (roomId: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/room/${roomId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to leave chat room: ${response.statusText}`);
    }
    return response.json();
};

// 채팅 시간 종료
export const endChatSession = async (roomId: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/room/end/${roomId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to end chat session: ${response.statusText}`);
    }
    return response.json();
};

// 채팅 메시지 보내기
export const sendMessage = async (message: { roomId: string; content: string }) => {
    const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
    if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
    }
    return response.json();
};

// 채팅 메시지 조회
export const fetchMessages = async (roomId: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/message?roomId=${roomId}`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }
    return response.json();
};

// 채팅 메시지 삭제
export const deleteMessage = async (messageId: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/message/${messageId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete message: ${response.statusText}`);
    }
    return response.json();
};

// 단체 채팅 리스트 보기
export const fetchChatRooms = async () => {
    const response = await fetch(`${API_BASE_URL}/chat/rooms`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch chat rooms: ${response.statusText}`);
    }
    return response.json();
};
