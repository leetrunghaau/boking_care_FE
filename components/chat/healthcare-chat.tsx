"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatBubble } from "./chat-bubble";
import { Send, Phone, FileText, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function HealthcareChat() {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState<
    "general" | "symptom" | "medication" | "appointment"
  >("general");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendQuickQuestion = async (text: string) => {
    const userMessage = { role: "user" as const, text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      const data = await res.json();
      const aiMessage = { role: "ai" as const, text: data.final_response_vi };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Lỗi kết nối tới máy chủ AI." },
      ]);
    }

    setIsLoading(false);
    setMessageType("general");
  };

  const quickActions = [
    {
      label: "Làm sao để đặt lịch hẹn với bác sĩ",
      icon: <FileText className="w-4 h-4" />,
      action: () => sendQuickQuestion("Làm sao để đặt lịch hẹn với bác sĩ?"),
    },
    {
      label: "Chuẩn đoán dựa trên triệu chứng",
      icon: <AlertTriangle className="w-4 h-4" />,
      action: () => sendQuickQuestion("Chuẩn đoán dựa trên triệu chứng"),
    },
    {
      label: "Thông tin về thuốc",
      icon: <Phone className="w-4 h-4" />,
      action: () => sendQuickQuestion("Thông tin về thuốc"),
    },
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      const aiMessage = { role: "ai" as const, text: data.final_response_vi };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Lỗi kết nối tới máy chủ AI." },
      ]);
    }

    setIsLoading(false);
    setInput("");
    setMessageType("general");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-50">
      {/* Header */}
      <Card className="rounded-none border-b">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Medly - HealthCare AI Assistant
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Get instant health guidance and support
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-gray-800 mb-2">
                Welcome to HealthCare AI
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                I'm here to help with general health questions and guidance. How
                can I assist you today?
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={action.action}
                    className="text-xs">
                    {action.icon}
                    <span className="ml-1">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            message={message.text}
            isUser={message.role === "user"}
            timestamp={formatTimestamp(new Date())}
            messageType={
              index === messages.length - 2 ? messageType : "general"
            }
            priority={
              message.text.toLowerCase().includes("urgent") ||
              message.text.toLowerCase().includes("emergency")
                ? "high"
                : "low"
            }
          />
        ))}

        {isLoading && <ChatBubble message="" isUser={false} isTyping={true} />}

        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <CardFooter className="border-t bg-white p-4">
        <div className="w-full space-y-3">
          {messageType !== "general" && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {messageType} inquiry
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMessageType("general")}
                className="text-xs h-6 px-2">
                Clear
              </Button>
            </div>
          )}

          <form onSubmit={onSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                messageType === "symptom"
                  ? "Describe your symptoms..."
                  : messageType === "medication"
                  ? "Ask about medication..."
                  : messageType === "appointment"
                  ? "What type of appointment do you need?"
                  : "Type your health question..."
              }
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </Button>
          </form>

          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={action.action}
                className={cn(
                  "text-xs h-8",
                  messageType ===
                    (action.label.toLowerCase().includes("appointment")
                      ? "appointment"
                      : action.label.toLowerCase().includes("symptom")
                      ? "symptom"
                      : "medication") && "bg-blue-100 text-blue-700"
                )}>
                {action.icon}
                <span className="ml-1">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardFooter>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-t border-yellow-200 p-3">
        <p className="text-xs text-yellow-800 text-center">
          ⚠️ This AI assistant provides general health information only. Always
          consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
}
