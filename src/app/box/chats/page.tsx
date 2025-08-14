"use client";

import {
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { Suspense, useEffect, useRef, useState } from "react";

import AvatarComp from "@/components/avatar.comp";
import ChatInputComp from "@/components/chat/chat-input.comp";
import ChatListComp from "@/components/chat/chat-list.comp";
import ClientComp from "@/components/client/client-section.comp";
import ContactListComp from "@/components/contact/contact-list.comp";
import OnlineBadgeComp from "@/components/online-badge.comp";
import { db } from "@/utils/firebase";
import { FirebaseChatType, mapFirebaseChatData } from "@/utils/mapping-data";

import ChatEndSessionComp from "../../../components/chat/chat-end-session.comp";

export default function ChatsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeContact, setActiveContact] = useState<any>(null);
  const [isOpenRight, setIsOpenRight] = useState(false);
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const [newChat, setNewChat] = useState<any[]>([]);
  const [historyFetched, setHistoryFetched] = useState(false);
  const [tempContainerHeight, setTempContainerHeight] = useState(0);
  const [chatLayout, setChatLayout] = useState("2-column");
  const [appendedChatId, setAppendedChatId] = useState<string>("");
  const [sessionInprogress, setSessionInprogress] = useState(false);
  const [contactListReloadKey, setContactListReloadKey] = useState(0);

  let parentStyle = "";
  let leftStyle = "";
  let rightStyle = "";
  let leftBtnStyle = "";
  let rightBtnStyle = "";
  if (chatLayout === "2-column") {
    parentStyle = "lg:grid-cols-3";
    leftStyle = "lg:pe-0 lg:max-w-full lg:-translate-x-0 lg:relative";
    rightStyle = "";
    leftBtnStyle = "lg:hidden";
    rightBtnStyle = "";
  } else if (chatLayout === "3-column") {
    parentStyle = "lg:grid-cols-3 xl:grid-cols-4";
    leftStyle = "lg:pe-0 lg:max-w-full lg:-translate-x-0 lg:relative";
    rightStyle = "xl:ps-0 xl:max-w-full xl:translate-x-0 xl:relative";
    leftBtnStyle = "lg:hidden";
    rightBtnStyle = "xl:hidden";
  }

  const handleChangeContact = (contact: any) => {
    setActiveContact(contact);
    setHistoryFetched(false);
    handleOpenLeftRight("close");
  };

  const handleOpenLeftRight = (type: string) => {
    if (type === "left") {
      setIsOpenLeft(!isOpenLeft);
      setIsOpenRight(false);
    } else if (type === "right") {
      setIsOpenRight(!isOpenRight);
      setIsOpenLeft(false);
    } else {
      setIsOpenRight(false);
      setIsOpenLeft(false);
    }
  };

  const scrollChatHistory = (scrollHeight: number) => {
    const el = containerRef.current;
    if (el) {
      const heightContainer =
        scrollHeight && scrollHeight > 0 ? scrollHeight : el.scrollHeight;
      el.scrollTo({
        top: heightContainer,
        behavior: "smooth",
      });
      setTempContainerHeight(heightContainer);
    }
  };

  const handleChatSend = (newChatData: any[]) => {
    setNewChat(newChatData);
    scrollChatHistory(tempContainerHeight + 200);

    // handle start chat after replayed activation
    const waitActivation =
      newChatData.length > 0 && newChatData[0].status === 3;
    setSessionInprogress(waitActivation);
  };

  const handleNewChatFromFireStore = (data: any[]) => {
    if (data.length > 0 && appendedChatId !== data[0].id) {
      setAppendedChatId(data[0].id);
      handleChatSend(data);
    }
  };

  useEffect(() => {
    if (!activeContact) return;
    scrollChatHistory(0);

    // subscribe to chat updates
    const q = query(collection(db, "data_collection"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // todo filter phone and merchant
      const newMessages = snapshot.docs
        .filter(
          (doc) =>
            doc.data().phone_number.toString() ===
            activeContact?.phone.toString()
        )
        .map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<FirebaseChatType, "id">),
        }));
      if (newMessages.length > 0) {
        const newChatFireStore = mapFirebaseChatData([newMessages[0]]);
        handleNewChatFromFireStore(newChatFireStore);
      }
    });

    // todo: listen delivery

    return () => unsubscribe();
  }, [activeContact]);

  useEffect(() => {
    const storedChatLayout = localStorage.getItem("chatLayout") || "2-column";
    setChatLayout(storedChatLayout);
  }, []);

  return (
    <div
      className={`relative grid h-full max-h-full grid-cols-2 gap-4 ${parentStyle}`}
    >
      {/* Left Sidebar for Contacts */}
      <div
        className={`absolute left-0 z-10 h-full max-h-full w-full max-w-96 -translate-x-full transform overflow-y-auto pe-12 transition-transform duration-300 ease-in-out ${
          isOpenLeft ? "!-translate-x-0" : ""
        } ${leftStyle}`}
      >
        <button
          onClick={() => handleOpenLeftRight("close")}
          className={`bg-background absolute top-4 right-2 z-20 flex items-center justify-center rounded-full border p-1 shadow-sm outline-0 ${leftBtnStyle}`}
        >
          <XMarkIcon className="size-6" />
        </button>
        <Suspense>
          <ContactListComp
            key={contactListReloadKey}
            onChange={(c) => handleChangeContact(c)}
            withAddButton
          />
        </Suspense>
      </div>

      {/* Center main for chat */}
      <div className="glass-box col-span-2 flex h-full max-h-full w-full flex-col overflow-y-auto rounded-4xl">
        <div className="shring-0 border-b p-4">
          <div className="flex justify-between gap-4 xl:gap-0">
            <div className={`${leftBtnStyle}`}>
              <button
                onClick={() => handleOpenLeftRight("left")}
                className="glass-box glass-box-hover flex items-center justify-center rounded-full p-1 outline-0"
              >
                <Bars3BottomLeftIcon className="size-6" />
              </button>
            </div>
            {activeContact ? (
              <div className="flex items-center gap-2">
                <AvatarComp
                  imageAlt={activeContact.name}
                  imageUrl={activeContact.photoUrl}
                />
                <div>
                  <p>{activeContact.name}</p>
                  <OnlineBadgeComp isOnline={true} isShow={false} />
                </div>
                <div className={`${rightBtnStyle}`}>
                  {activeContact.status && historyFetched && (
                    <ChatEndSessionComp
                      phone={activeContact.phone}
                      onEnded={() => {
                        setActiveContact(null);
                        setSessionInprogress(false); // Close chat box
                        setIsOpenRight(false);
                        setIsOpenLeft(false);
                        setContactListReloadKey((k) => k + 1);
                      }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div className={`${rightBtnStyle}`}>
              <button
                onClick={() => handleOpenLeftRight("right")}
                className="glass-box glass-box-hover flex items-center justify-center rounded-full p-1 outline-0"
              >
                <Bars3BottomRightIcon className="size-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-8" ref={containerRef}>
          <ChatListComp
            contact={activeContact}
            newChat={newChat}
            onChatFetched={(h) => {
              scrollChatHistory(h);
              setHistoryFetched(true);
            }}
          />
        </div>
        <div className="shring-1 px-4 pb-4">
          {activeContact && historyFetched ? (
            <ChatInputComp
              contact={activeContact}
              onChatSend={handleChatSend}
              sessionProgress={sessionInprogress}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Right Sidebar for Contacts Info */}
      <div
        className={`absolute right-0 z-10 h-full max-h-full w-full max-w-96 translate-x-full transform overflow-y-auto ps-12 transition-transform duration-300 ease-in-out ${
          isOpenRight ? "!translate-x-0" : ""
        } ${rightStyle}`}
      >
        <button
          onClick={() => handleOpenLeftRight("close")}
          className={`bg-background absolute top-4 left-2 z-20 flex items-center justify-center rounded-full border p-1 shadow-sm outline-0 ${rightBtnStyle}`}
        >
          <XMarkIcon className="size-6" />
        </button>
        <ClientComp
          contact={activeContact}
          key={activeContact ? `cc-${activeContact.id}` : "cc"}
        />
      </div>
    </div>
  );
}
