import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isTyping?: boolean;
  priority?: "low" | "medium" | "high";
  messageType?: "general" | "symptom" | "medication" | "appointment";
}

export function ChatBubble({
  message,
  isUser,
  timestamp,
  isTyping = false,
  priority = "low",
  messageType = "general",
}: ChatBubbleProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border-red-200";
      case "medium":
        return "bg-yellow-100 border-yellow-200";
      default:
        return "bg-blue-50 border-blue-100";
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case "symptom":
        return <AlertCircle className="w-3 h-3" />;
      case "medication":
        return <Clock className="w-3 h-3" />;
      case "appointment":
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}>
      {!isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src="/Medly.jpg" />
          <AvatarFallback className="bg-blue-500 text-white">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[70%] space-y-1",
          isUser ? "items-end" : "items-start"
        )}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm border",
            isUser
              ? "bg-teal-600 text-white ml-auto"
              : cn(
                  "bg-white text-gray-800",
                  !isUser && priority !== "low" && getPriorityColor(priority)
                )
          )}>
          {!isUser && messageType !== "general" && (
            <div className="flex items-center gap-1 mb-2">
              {getMessageTypeIcon(messageType)}
              <Badge variant="secondary" className="text-xs">
                {messageType}
              </Badge>
            </div>
          )}

          {isTyping ? (
            <div className="flex items-center gap-1">
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
              <span className="text-sm text-gray-500 ml-2">
                Medly đang trả lời...
              </span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message}
            </p>
          )}
        </div>

        {timestamp && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs text-gray-500",
              isUser ? "justify-end" : "justify-start"
            )}>
            <Clock className="w-3 h-3" />
            <span>{timestamp}</span>
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarFallback className="bg-teal-100 text-white">
            <User className="w-4 h-4 text-gray-600" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
