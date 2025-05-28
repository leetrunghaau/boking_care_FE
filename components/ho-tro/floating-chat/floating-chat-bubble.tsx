"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Bot,
  User,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface FloatingChatBubbleProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  primaryColor?: string;
  title?: string;
  placeholder?: string;
  welcomeMessage?: string;
}

export function FloatingChatBubble({
  position = "bottom-right",
  primaryColor = "bg-teal-600",
  title = "AI Assistant",
  placeholder = "Type your message...",
  welcomeMessage = "Hi! I'm your AI assistant. How can I help you today?",
}: FloatingChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom on messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Send message & fetch AI response
  // Send message & fetch AI response
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    // Thêm message người dùng vào list ngay lập tức (giao diện phản hồi nhanh)
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Xóa input sau khi gửi
    setIsLoading(true); // Bật loading để hiện "Typing..."

    try {
      // Gọi API backend trả lời
      const res = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage.content }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      // Tạo message trả lời từ AI
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content:
          data.final_response_vi ??
          "Xin lỗi, tôi không tìm thấy câu trả lời phù hợp.",
        role: "assistant",
        timestamp: new Date(),
      };

      // Thêm message AI vào list
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Nếu lỗi, thêm message báo lỗi
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: "Oops! Something went wrong. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Tắt loading
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const ChatBubbleMessage = ({
    message,
    isUser,
  }: {
    message: ChatMessage;
    isUser: boolean;
  }) => (
    <div
      className={cn(
        "flex gap-2 mb-3",
        isUser ? "justify-end" : "justify-start"
      )}>
      {!isUser && (
        <Avatar className="w-6 h-6 mt-1">
          <AvatarFallback className={cn("text-white text-xs", primaryColor)}>
            <Bot className="w-3 h-3" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn("max-w-[80%]", isUser ? "order-1" : "order-2")}>
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-sm",
            isUser
              ? cn("text-white ml-auto", primaryColor)
              : "bg-gray-100 text-gray-800"
          )}>
          {message.content}
        </div>
        <div
          className={cn(
            "text-xs text-gray-500 mt-1",
            isUser ? "text-right" : "text-left"
          )}>
          {formatTime(message.timestamp)}
        </div>
      </div>

      {isUser && (
        <Avatar className="w-6 h-6 mt-1 order-2">
          <AvatarFallback className="bg-gray-500 text-white text-xs">
            <User className="w-3 h-3" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex gap-2 mb-3">
      <Avatar className="w-6 h-6 mt-1">
        <AvatarImage src="/Medly.jpg" />
        <AvatarFallback className={cn("text-white text-xs", primaryColor)}>
          <Bot className="w-3 h-3" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-gray-100 rounded-2xl px-3 py-2">
        <div className="flex gap-1">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <div className={cn("fixed z-50", getPositionClasses())}>
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110",
            primaryColor
          )}>
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("fixed z-50", getPositionClasses())}>
      <Card
        className={cn(
          "w-80 h-96 shadow-2xl transition-all duration-300",
          isMinimized ? "h-12" : "h-96"
        )}>
        <CardHeader className={cn("pb-2", primaryColor, "text-white")}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 text-white hover:bg-white/20">
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 text-white hover:bg-white/20">
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-y-auto p-3 h-64">
              {messages.length === 0 && (
                <div className="flex gap-2 mb-3">
                  <Avatar className="w-6 h-6 mt-1">
                    <AvatarFallback
                      className={cn("text-white text-xs", primaryColor)}>
                      <Bot className="w-3 h-3" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-2xl px-3 py-2 text-sm">
                    {welcomeMessage}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <ChatBubbleMessage
                  key={message.id}
                  message={message}
                  isUser={message.role === "user"}
                />
              ))}

              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </CardContent>

            <CardFooter className="p-3 pt-0">
              <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="flex-1 h-8 text-sm"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading || !input.trim()}
                  className={cn("h-8 w-8 p-0", primaryColor)}>
                  <Send className="w-3 h-3" />
                </Button>
              </form>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
