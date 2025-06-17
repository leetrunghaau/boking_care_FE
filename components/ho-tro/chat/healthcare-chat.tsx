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
import { ChatBubble } from "../chat-bubble";
import { Send, Phone, FileText, AlertTriangle, Thermometer, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { handleApiError } from "@/helper/toast-utils";
import { ipconfig } from './../../../helper/ip';

export function HealthcareChat() {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false)
  
  const [messageType, setMessageType] = useState<
    "general" | "symptom" | "medication" | "appointment"
  >("general");

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
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
    setIsTyping(true); // Hiển thị typing ngay sau khi user gửi
    setMessageType("general");

    try {
      const res = await fetch(`${ipconfig.AI}AI/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.body) throw new Error("No response body from AI");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = "";
      let hasPushedAssistantMessage = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        accumulatedText += chunk;

        if (!hasPushedAssistantMessage) {
          // Thêm assistant message lần đầu
          setMessages((prev) => [
            ...prev,
            { role: "ai", text: accumulatedText },
          ]);
          hasPushedAssistantMessage = true;
          setIsTyping(false); // Ẩn typing ngay sau khi có chunk đầu
        } else {
          // Cập nhật nội dung assistant
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.findLastIndex((m) => m.role === "ai");
            if (lastIndex !== -1) {
              updated[lastIndex] = {
                ...updated[lastIndex],
                text: accumulatedText,
              };
            }
            return updated;
          });
        }
      }
    } catch (error) {
      console.error("AI stream error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Lỗi kết nối tới máy chủ AI." },
      ]);
      handleApiError(error, "Không kết nối được với AI Service.");
      setIsTyping(false);
    }

    setIsLoading(false);
    setIsTyping(false);
  };
  
  const quickActions = [
    {
      label: "Tôi nên làm gì khi bị sốt nhẹ?",
      icon: <Thermometer className="w-4 h-4" />,
      action: () => sendQuickQuestion("Tôi nên làm gì khi bị sốt nhẹ?"),
    },
    {
      label: "Triệu chứng ho kéo dài có đáng lo không?",
      icon: <AlertTriangle className="w-4 h-4" />,
      action: () => sendQuickQuestion("Triệu chứng ho kéo dài có đáng lo không?"),
    },
    {
      label: "Làm sao để giảm stress hiệu quả?",
      icon: <Heart className="w-4 h-4" />,
      action: () => sendQuickQuestion("Làm sao để giảm stress hiệu quả?"),
    },
  ];
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setInput("");

    try {
      const res = await fetch(`${ipconfig.AI}AI/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.body) throw new Error("No response body from AI");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = "";
      let hasPushedAssistantMessage = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        accumulatedText += chunk;

        // Khi có nội dung đầu tiên từ AI, thêm message
        if (!hasPushedAssistantMessage) {
          setMessages((prev) => [
            ...prev,
            { role: "ai", text: accumulatedText },
          ]);
          hasPushedAssistantMessage = true;
          setIsTyping(false); // Ẩn typing ngay sau khi có chunk đầu tiên
        } else {
          // Update nội dung assistant
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.findLastIndex((m) => m.role === "ai");
            if (lastIndex !== -1) {
              updated[lastIndex] = {
                ...updated[lastIndex],
                text: accumulatedText,
              };
            }
            return updated;
          });
        }
      }
    } catch (error) {
      console.error("AI stream error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Đã có lỗi xảy ra. Vui lòng thử lại." },
      ]);
      setIsTyping(false);
    }

    setIsLoading(false);
    setIsTyping(false);
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
                Medly - Trợ lý sức khỏe của bạn
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Tận tâm đồng hành, mang đến sự an tâm cho sức khỏe của bạn.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages */}
      <CardContent
        ref={messageContainerRef}
         className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-gray-800 mb-2">
                Chào mừng đến với MedPlus. Tôi là Medly!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tôi ở đây để hỗ trợ bạn với các câu hỏi sức khỏe chung và hướng
                dẫn cần thiết. Hôm nay tôi có thể giúp gì cho bạn?
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

        {isTyping && <ChatBubble message="" isUser={false} isTyping={true} />}

        {/* <div ref={messagesEndRef} /> */}
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
              className="bg-teal-600 hover:bg-teal-700">
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
          ⚠️ Medly giúp bạn hiểu thêm về sức khỏe, nhưng đừng quên hỏi ý kiến bác sĩ để được tư vấn chính xác nhé!.
        </p>
      </div>
    </div>
  );
}
