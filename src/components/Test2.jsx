import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Test2 = () => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [conversation, setConversation] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentMessage.trim()) return;

        // Add user message to conversation
        const userMessage = { type: 'user', content: currentMessage };
        setConversation((prev) => [...prev, userMessage]);

        // Fetch AI response
        const genAI = new GoogleGenerativeAI("AIzaSyDaC7HxL_n5UjJSaeZhg2AsU5oWKJUmXv0");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = currentMessage;

        const result = await model.generateContent(prompt);
        const aiResponse = { type: 'ai', content: result.response.text() };

        // Add AI response to conversation
        setConversation((prev) => [...prev, aiResponse]);
        setCurrentMessage('');
    };

    return (
        <div className="h-lvh p-20">
            <div className="card h-[500px] flex flex-col gap-5 overflow-y-auto">
                {conversation.map((message, index) => (
                    <div key={index} className={`p-2 rounded-sm border border-black ${message.type === 'user' ? 'bg-blue-300 text-left' : 'bg-green-300 text-right'}`}>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>

            <div className="card w-full flex gap-2 mt-4">
                <form onSubmit={handleSubmit} className="flex w-full">
                    <input
                        className="w-full p-2 bg-slate-400"
                        placeholder="Chat"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        type="text"
                    />
                    <button type="submit" className="bg-stone-950 rounded-sm p-2 text-white">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Test2;
