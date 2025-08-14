"use client";

import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { Suspense, useState } from "react";

import ContactFormComp from "@/components/contact/contact-form";
import ContactListComp from "@/components/contact/contact-list.comp";

export default function ContactsPage() {
  const [activeContact, setActiveContact] = useState<any>(null);
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const [addedCounter, setAddedCounter] = useState(0);

  const handleChangeContact = (contact: any) => {
    setActiveContact(contact);
  };

  const handleOpenLeft = (type: string) => {
    if (type === "left") {
      setIsOpenLeft(!isOpenLeft);
    } else {
      setIsOpenLeft(false);
    }
  };

  const handeAddedContact = () => {
    setAddedCounter((prev) => prev + 1);
  };

  return (
    <div className="relative grid h-full max-h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        className={`absolute left-0 z-10 h-full max-h-full w-full max-w-96 -translate-x-full transform overflow-y-auto pe-12 transition-transform duration-300 ease-in-out md:relative md:max-w-full md:-translate-x-0 md:pe-0 ${
          isOpenLeft ? "!-translate-x-0" : ""
        }`}
      >
        <button
          onClick={() => handleOpenLeft("close")}
          className="bg-background absolute top-4 right-2 z-20 flex items-center justify-center rounded-full border p-1 shadow-sm outline-0 md:hidden"
        >
          <XMarkIcon className="size-6" />
        </button>
        <Suspense>
          <ContactListComp onChange={handleChangeContact} key={addedCounter} />
        </Suspense>
      </div>

      <div className="glass-box h-full max-h-full w-full overflow-y-auto rounded-4xl md:col-span-1 lg:col-span-2">
        <div className="flex h-full w-full flex-col overflow-y-auto">
          <div className="shring-0 border-b p-4">
            <div className="flex items-center gap-4 lg:gap-0">
              <div className="md:hidden">
                <button
                  onClick={() => handleOpenLeft("left")}
                  className="glass-box glass-box-hover flex items-center justify-center rounded-full p-1 outline-0"
                >
                  <Bars3BottomLeftIcon className="size-6" />
                </button>
              </div>
              <div>
                <p className="page-title">Add new contact</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <ContactFormComp
              activeContact={activeContact}
              onAdded={() => handeAddedContact()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
