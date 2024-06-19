import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { getData } from '@/app/api/api';

interface ChatWindowProps {
    roomId: any;
    isGroupChat: boolean;
}

interface Message {
    id: string;
    msg: string;
    sender: string;
    senderProfile: string;
    receiver: string;
    roomNum: number;
    isOwnMessage: boolean;
    createAt: string;
}

// 로그인 시스템 대신 임시 방편


const ChatWindow: React.FC<ChatWindowProps> = ({ roomId, isGroupChat }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [profileImage, setProfileImage] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const stompClient = useRef<CompatClient>();
    const subscriptionRef = useRef<any>();
    const roomNum = roomId.id

    useEffect(() => {
        const getProfileImage = async () => {
            try {
                const response = await getData(
                    `/users/${localStorage.getItem("user_id")}`,
                    "honjaya"
                );
                console.log(response.data.profileImage);
                setProfileImage(response.data.profileImage);
                setUsername(response.data.name)
            } catch (e) {
                console.error(e);
            }
        };

        const handleNewMessage = (message: any) => {
            const formattedMessage: Message = {
                id: message.id,
                msg: message.msg,
                sender: message.sender,
                senderProfile: message.senderProfile,
                receiver: message.receiver,
                roomNum: message.roomNum,
                isOwnMessage: message.sender === username,
                createAt: message.createAt,
            };
            console.log(formattedMessage);
            setMessages((prevMessages) => [...prevMessages, formattedMessage]);
        };

        getProfileImage();

        if (isGroupChat) {
            const usernameElement = document.querySelector("#username");

            if (usernameElement) {
                usernameElement.innerHTML = username || "unknown user";
            }

            const eventSource = new EventSource(`http://localhost:8081/chat/roomNum/${roomNum}`);
            eventSource.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    handleNewMessage(message);
                } catch (error) {
                    console.error('Failed to parse message:', error);
                }
            };
            eventSource.onerror = (error) => {
                console.error('EventSource error:', error);
            };
            return () => {
                eventSource.close();
            };
        } else {
            const getMessageHistory = async () => {
                try {
                    const messages = await getData(`/chat/messages/${roomId.id}`, "honjaya");
                    messages.forEach((message: any) => {
                        handleNewMessage(message);
                    })
                    console.log(JSON.stringify(messages));
                } catch (error) {
                    console.error(error);
                }
                
            }   
            getMessageHistory();
            const socket = new SockJS('http://localhost:8080/api/ws');
            stompClient.current = Stomp.over(socket);

            const connectCallback = (frame:any) => {
                console.log('Connected: ' + frame);

                if (subscriptionRef.current) {
                    subscriptionRef.current.unsubscribe();
                }

                subscriptionRef.current = stompClient.current?.subscribe(`/topic/chat/${roomId.id}`, (data) => {
                    try {
                        console.log(data)
                        console.log("메시지:" + data.body)
                        const message = JSON.parse(data.body);
                        handleNewMessage(message);
                        console.log(`${roomId}번 방에서 새로운 메시지 수신 : `, message);
                    } catch (error) {
                        console.error(`${roomId}번 방에서 메시지 수신 오류`, error);
                    }
                });
            };
            stompClient.current.connect({}, connectCallback);

            return () => {
                if (subscriptionRef.current) {
                    subscriptionRef.current.unsubscribe();
                }
                if (stompClient.current) {
                    stompClient.current.disconnect();
                }
            };
        }
    }, [roomNum, username]);

    const handleSendMessage = async (message: string) => {

        if (isGroupChat) {
            const newMessage = {
                id: `${Date.now()}`,
                msg: message,
                sender: username,
                receiver: "", // 수신자 이름 필요
                roomNum: roomId,
                isOwnMessage: true,
                createAt: new Date().toISOString(),
            };
            try {
                await fetch("http://localhost:8081/chat", { // 때에따라 바꾸자 8080->8081로 현재 변경
                    method: "POST",
                    body: JSON.stringify(newMessage),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                });
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        } else {
            const newMessage = {
                type: "CHAT",
                msg: message,
                sender: username,
                senderProfile: profileImage,
                roomNum: roomNum,
                isOwnMessage: true,
                createAt: new Date().toISOString(),
            };
            try {
                console.log(JSON.stringify(newMessage));
                stompClient.current?.send(`/app/chat.send/${roomId.id}`, {}, JSON.stringify(newMessage));
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div id="chat-box" className="flex-grow overflow-y-auto p-4">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500">No messages yet</div>
                ) : (

                    // ChatMessage 컴포넌트에 각 메시지의 속성을 props로 전달하여 해당 메시지를 렌더링한다.
                    messages.map((msg, index) => {
                        const nextMsg = messages[index + 1]; // 다음 메시지
                        const isLast =
                            !nextMsg ||  // 다음 메시지가 없거나
                            nextMsg.sender !== msg.sender ||  // 다음 메시지의 발신자가 현재 메시지의 발신자와 다르거나
                            new Date(msg.createAt).getMinutes() !== new Date(nextMsg.createAt).getMinutes(); // 분이 다르면
                        return (
                            <ChatMessage
                                key={index}
                                message={msg.msg}
                                sender={msg.sender}
                                senderProfile={msg.senderProfile}
                                isOwnMessage={msg.isOwnMessage}
                                timestamp={msg.createAt}
                                onDelete={() => { }} // 삭제 기능 필요시 추가
                                isLast={isLast}
                            />
                        )
                    })
                )}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;