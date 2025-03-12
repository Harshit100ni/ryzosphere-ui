import { useState } from "react";
import { Loader, User, MessageCircle } from "lucide-react";
import useScrollBottom from "../hooks/useScrollBottom";
import { useChatMutation } from "../query/useChatMutation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to the Neo4j Knowledge Graph Chat. You can ask questions related to documents which have been completely processed.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const { endRef } = useScrollBottom({
    deps: [messages, typing],
  });
  const { mutate: sendMessage, isLoading: loading } = useChatMutation(
    (data: any) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    }
  );

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setTyping(true);

    sendMessage(
      { query: input },
      {
        onError: () => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Sorry, there was an error processing your request.",
            },
          ]);
        },
        onSettled: () => {
          setInput("");
          setTyping(false);
        },
      }
    );
  };
  return (
    <div className="flex flex-col max-w-md pr-4 h-full">
      <div className="flex flex-col justify-end bg-white rounded-lg shadow-md p-4 h-full">
        <div
          className="overflow-y-auto mb-4 pr-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "gray lightgray",
          }}
        >
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-100 ml-auto max-w-[80%]"
                  : "bg-gray-100 mr-auto max-w-[80%]"
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="mt-1 flex-shrink-0">
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <MessageCircle className="w-4 h-4" />
                  )}
                </div>
                <span className="flex-1">{message.content}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="mb-4 p-3 rounded-lg bg-gray-100 mr-auto max-w-[80%] flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>Typing...</span>
              <Loader className="w-4 h-4 animate-spin" />
            </div>
          )}

          {/* <div ref={endRef} /> */}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={loading}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-blue-500 w-36 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
