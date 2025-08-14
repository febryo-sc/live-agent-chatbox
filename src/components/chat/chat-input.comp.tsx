import { PaperAirplaneIcon, SparklesIcon } from "@heroicons/react/24/solid";

import { useEffect, useRef, useState } from "react";

import { activateChatSession, sendMessage } from "@/data/chats";

import ChatAttachmentComp from "./chat-attachment.comp";

export default function ChatInputComp({
  contact,
  onChatSend,
  sessionProgress,
}: {
  contact: any;
  onChatSend: (message: any) => void;
  sessionProgress: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isChatSession, setIsChatSession] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isWaitingActivation, setIsWaitingActivation] = useState(false);

  useEffect(() => {
    if (contact) {
      setIsChatSession(contact.status);
    }
  }, [contact]);

  useEffect(() => {
    setIsWaitingActivation(sessionProgress);
    if (sessionProgress && !isChatSession) {
      setIsChatSession(true);
    }
  }, [sessionProgress, isChatSession]);

  const handleSendMessage = async () => {
    try {
      setLoading(true);
      const data = await sendMessage(contact.phone, message);
      if (data.length < 1) {
        console.error("Failed to send message");
        setIsChatSession(false);
      } else {
        onChatSend(data);
      }
    } catch (error) {
      console.error("Failed to fetch chat history", error);
    }
    setLoading(false);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "50px";
    }
  };

  const handleActivateSession = async () => {
    try {
      setLoading(true);
      const data = await activateChatSession(contact.phone, message);
      onChatSend(data);
    } catch (error) {
      console.error("Failed to activate chat session", error);
    }
    setLoading(false);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "50px";
    }
  };

  const handleUploadedFile = (f: string) => {
    setMessage((prev) => {
      const cleanPrev = prev.replace(/^\s*\S+\s*/, "");
      return cleanPrev != "" ? `${cleanPrev} ${f}` : `${f}`;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && isChatSession) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === "Enter" && !e.shiftKey && !isChatSession) {
      e.preventDefault();
      handleActivateSession();
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea && message) {
      textarea.style.height = "auto";
      textarea.style.height =
        textarea.scrollHeight <= 72 ? `50px` : `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className="input-chat-group relative flex w-full items-center justify-between gap-2 px-2 py-1">
      {!isWaitingActivation ? (
        <ChatAttachmentComp
          onUploaded={(f: string) => handleUploadedFile(f)}
          disabled={isWaitingActivation}
        />
      ) : (
        <div className="px-2" />
      )}

      <textarea
        ref={textareaRef}
        placeholder={
          isWaitingActivation
            ? "Activation has been sent, New chat session will start after customer replies to chat"
            : isChatSession
              ? "Type a message..."
              : "Type message and activate chat session"
        }
        className="input-chat"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        name="input-chat"
        disabled={isWaitingActivation}
      />
      {isWaitingActivation ? (
        <div></div>
      ) : (
        <>
          {isChatSession ? (
            <button
              className="primary-button"
              onClick={handleSendMessage}
              disabled={loading || !message.trim() || isWaitingActivation}
            >
              {loading ? (
                <SparklesIcon className="inline-block size-6 animate-pulse" />
              ) : (
                <PaperAirplaneIcon className="inline-block size-6" />
              )}
            </button>
          ) : (
            <button
              className="primary-button !px-4"
              onClick={handleActivateSession}
              disabled={true}
              // disabled={loading || !message.trim() || isWaitingActivation}
            >
              <span>Not started by user</span>
              {loading && (
                <SparklesIcon className="ms-2 inline-block size-5 animate-pulse" />
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}
