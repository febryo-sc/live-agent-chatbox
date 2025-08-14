"use client";

import { convertTextToHtml } from "@/utils/formatter";

import SmartDateComp from "../smart-date.comp";

export default function ChatCardComp({ data }: { data: any }) {
  const htmlString = convertTextToHtml(data.message);

  return (
    <div
      className={`flex text-sm ${data.sender === "me" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={
          data.sender === "me" ? "chat-bubble-me" : "chat-bubble-other"
        }
      >
        <div
          dangerouslySetInnerHTML={{ __html: htmlString }}
          className="prose max-w-none"
        />
        <div className="chat-time">
          <SmartDateComp datetime={data.time} />
        </div>
      </div>
    </div>
  );
}
