"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ipconfig } from "../../../helper/ip";

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const Bubble = ({ msg }: { msg: ChatMessage }) => (
  <div className={cn("flex gap-2 mb-3", msg.role === "user" ? "justify-end" : "justify-start")}>
    <div className={cn("max-w-[80%]", msg.role === "user" ? "order-1" : "order-2")}>
      {
        msg.content.length > 0 ?
          <div
            className={cn(
              "rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap",
              msg.role === "user" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800"
            )}
          >
            {msg.content}
          </div> :
          <TypingIndicator />
      }

      <div className={cn("text-xs text-gray-500 mt-1", msg.role === "user" ? "text-right" : "text-left")}>
        {formatTime(msg.timestamp)}
      </div>
    </div>
  </div>
)

const TypingIndicator = () => (
  <div className="flex gap-2 mb-3">
    <div className="bg-gray-100 rounded-2xl px-3 py-2 flex gap-1">
      {[0, 150, 300].map((delay) => (
        <div
          key={delay}
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  </div>
);

export function FloatingChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: String(new Date()),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const assistantId = String(new Date());
    setMessages((prev) => [
      ...prev,
      { id: assistantId, content: "", role: "assistant", timestamp: new Date() },
    ]);

    try {
      const res = await fetch(`${ipconfig.AI}AI/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          text += decoder.decode(value, { stream: true });

          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: text } : m))
          );
        }
      }
    } catch (err) {
      console.error("❌ Stream error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Oops! Something went wrong. Please try again later." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return isOpen ? (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 h-96 shadow-2xl">
        <CardHeader className="pb-2 bg-teal-600 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <CardTitle className="text-sm">Trò chuyện cùng Medly</CardTitle>
            </div>
            <Button onClick={() => setIsOpen(false)} size="sm" variant="ghost" className="h-6 w-6 p-0 text-white">
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-3 h-64">
          {messages.length === 0 && (
            <Bubble
              msg={{
                id: "initial",
                content: "Hi! I'm your AI assistant. How can I help you today?",
                role: "assistant",
                timestamp: new Date(),
              }}
            />
          )}
          {messages.map((msg) => (
            <Bubble key={msg.id} msg={msg} />
          ))}
          {/* {isLoading && <TypingIndicator />} */}
          <div ref={messagesEndRef} />
        </CardContent>

        <CardFooter className="p-3 pt-0">
          <form onSubmit={sendMessage} className="flex gap-2 w-full">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-8 text-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="sm"
              className="h-8 w-8 p-0 bg-teal-600 text-white"
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-3 h-3" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={() => setIsOpen(true)} className="rounded-full w-14 h-14 bg-teal-600 text-white">
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
}
