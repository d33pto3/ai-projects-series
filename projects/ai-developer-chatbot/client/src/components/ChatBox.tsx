import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/api";
import { Message } from "./Message";

export const ChatBox = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are a senior software engineer helping developers.",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };

    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, { role: "assistant", content: "" }]);

    setInput("");

    const stream = await sendMessage(newMessages);
    if (!stream) return;

    const reader = stream.getReader();
    const decoder = new TextDecoder();

    let assistantText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      assistantText += chunk;

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: assistantText,
        };
        return updated;
      });
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-2xl mx-auto p-4 border rounded-lg bg-gray-100">
      <div className="flex-1 overflow-y-auto flex flex-col">
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            role={msg.role as "user" | "assistant"}
            content={msg.content}
          />
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="mt-2 flex">
        <input
          className="flex-1 border rounded-l px-2 py-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};
