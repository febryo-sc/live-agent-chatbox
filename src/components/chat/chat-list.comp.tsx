"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/solid";

import { useEffect, useRef, useState } from "react";

import { fetchChatHistory } from "@/data/chats";

import ChatCardComp from "./chat-card.comp";

export default function ChatListComp({
  contact,
  newChat,
  onChatFetched,
}: {
  contact: any;
  newChat?: any[];
  onChatFetched: (h: any) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contact) return;
    // get chat history for the selected contact
    const getChatHistory = async () => {
      try {
        setLoading(true);
        const data = await fetchChatHistory(contact.phone);
        setChats(data);
      } catch (error) {
        console.error("Failed to fetch chat history", error);
      }
      setLoading(false);
    };
    getChatHistory();
  }, [contact]);

  useEffect(() => {
    if (newChat) {
      setChats((prev) => [...prev, ...newChat]);
    }
  }, [newChat]);

  useEffect(() => {
    if (loading) {
      return;
    }
    const el = containerRef.current;
    if (el && typeof el.scrollHeight === "number") {
      onChatFetched(el.scrollHeight);
    }
  }, [loading, newChat, onChatFetched, containerRef]);

  return contact ? (
    <>
      {loading ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <ChatBubbleOvalLeftEllipsisIcon className="size-12 animate-bounce" />
          <p className="text-sm">Loading chat history...</p>
        </div>
      ) : (
        <div
          ref={containerRef}
          className={`flex flex-col gap-2 overflow-y-auto py-2 ${
            chats.length > 0 ? "" : "h-full w-full items-center justify-center"
          }`}
        >
          {chats.map((ct) => (
            <div key={ct.id}>
              <ChatCardComp data={ct} />
            </div>
          ))}
          {chats.length < 1 && <p className="text-sm">No chat history</p>}
        </div>
      )}
    </>
  ) : (
    <div className="flex h-full w-full items-center justify-center">
      <div className="glass-box w-3/5 rounded-4xl p-6 text-center">
        <ChatBubbleOvalLeftIcon className="mx-auto size-14" />
        <p className="mt-2 text-lg">
          Select one of the contact for start messeging.
        </p>
      </div>
    </div>
  );
}
