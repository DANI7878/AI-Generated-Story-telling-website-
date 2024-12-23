import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import './css/dynamic.css';
import { OPENAI_API_KEY } from './config';


function ChatPage() {
    const { paramName } = useParams();
    const [messages, setMessages] = useState([]);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        sendMessage();
    }, []);

    const sendMessage = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [...messages, { role: "user", content: paramName }],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    },
                }
            );

            const newMessages = [...messages, { role: "user", content: paramName }];
            newMessages.push({ role: "assistant", content: response.data.choices[0].message.content });

            setMessages(newMessages);
            setLoading(false);
        } catch (error) {
            console.error("Error sending message:", error);
            setErrorMessage("Error sending message: " + error.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Chat with AI Assistant</h1>
            {Loading && <p>Loading...</p>}
            {errorMessage && <p>Error: {errorMessage}</p>}
            <div className="chat-box">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        {message.content}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatPage;
