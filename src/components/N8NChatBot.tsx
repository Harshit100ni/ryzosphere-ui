import React, { useState } from "react";
import { ArrowRight, User, Bot } from "lucide-react";

const N8NChatBot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Welcome to the Neo4j Knowledge Graph Chat. You can ask questions related to documents that have been completely processed.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://creativeglu.app.n8n.cloud/webhook/7159b04d-69bf-4972-980a-4bc268a2f708/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: input }),
        }
      );

      const data = await response.json();
      const botResponse = {
        text: data?.output || "Sorry, I couldn't understand.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error reaching chatbot.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100%] mr-4 bg-[#F1FAFF] p-6 rounded-md flex flex-col gap-5 shadow-lg">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto border-b pb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start mb-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && <Bot className="mr-2 text-gray-600" />}
            <div
              className={`p-3 rounded-lg max-w-[75%] ${
                msg.sender === "bot"
                  ? "bg-gray-200 text-gray-900"
                  : "bg-[#1D4A72] text-white "
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && <User className="ml-2 text-[#1D4A72]" />}
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex items-center justify-start text-gray-600">
            <Bot className="mr-2" />
            <span className="italic">Typing...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center border-t pt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border rounded-l"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className={`ml-2 p-3 rounded-full ${
            input.trim() ? "bg-[#1D4A72] text-white" : "bg-gray-400"
          }`}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default N8NChatBot;
