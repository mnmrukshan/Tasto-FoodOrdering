import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import axios from 'axios';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! I am Tasto AI Chef. How can I assist you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Using localhost:4000 to hit the backend directly for local development.
            // If there's an environment variable like process.env.REACT_APP_URL, we could use that.
            const response = await axios.post('http://localhost:4000/api/chat', { message: input });
            if (response.data.success) {
                setMessages(prev => [...prev, { sender: 'bot', text: response.data.response }]);
            } else {
                setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I am having trouble connecting to the kitchen right now." }]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, a network error occurred." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        Tasto AI Chef
                        <button className="chatbot-close-btn" onClick={toggleChat} aria-label="Close Chat">
                            &times;
                        </button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-bubble ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && <div className="typing-indicator">Chef is typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chatbot-input-area">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Ask about our menu..." 
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
            {!isOpen && (
                <button className="chatbot-toggle-btn" onClick={toggleChat}>
                    💬
                </button>
            )}
        </div>
    );
};

export default Chatbot;
