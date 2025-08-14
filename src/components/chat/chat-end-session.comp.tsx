"use client";

import { useState } from "react";

import { deactivateChatSession } from "@/data/chats";

// Import the function

type EndSessionButtonProps = {
  phone: string;
  onEnded?: () => void;
};

export default function ChatEndSessionComp({
  phone,
  onEnded,
}: EndSessionButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleEndSession = async () => {
    setLoading(true);
    try {
      await deactivateChatSession(phone, "Session ended"); // Use the imported function
      if (onEnded) onEnded();
    } catch (error) {
      console.error("Failed to end session", error);
    }
    setLoading(false);
  };

  return (
    <button
      className="glass-box glass-box-hover rounded-lg border border-red-400 px-4 py-2 text-red-600"
      onClick={handleEndSession}
      disabled={loading}
    >
      {loading ? "Ending..." : "End Session"}
    </button>
  );
}
