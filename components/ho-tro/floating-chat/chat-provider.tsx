"use client";

import type React from "react";

import { FloatingChatBubble } from "./floating-chat-bubble";

interface ChatProviderProps {
  children: React.ReactNode;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  primaryColor?: string;
  title?: string;
  placeholder?: string;
  welcomeMessage?: string;
}

export function ChatProvider({
  children,
  position = "bottom-right",
  primaryColor = "bg-teal-600",
  title = "AI Assistant",
  placeholder = "Type your message...",
  welcomeMessage = "Hi! I'm Medly, your AI assistant. How can I help you today?",
}: ChatProviderProps) {
  return (
    <>
      {children}
      <FloatingChatBubble
        position={position}
        primaryColor={primaryColor}
        title={title}
        placeholder={placeholder}
        welcomeMessage={welcomeMessage}
      />
    </>
  );
}