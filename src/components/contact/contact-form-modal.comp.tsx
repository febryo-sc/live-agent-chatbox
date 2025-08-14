"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { useState } from "react";

import ContactFormComp from "./contact-form";

export default function ContactFormModalComp({
  onAdded,
}: {
  onAdded: (c: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddedContact = (c: any[]) => {
    setIsOpen(false);
    onAdded(c);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="secondary-button !p-3">
        {isOpen ? (
          <XMarkIcon className="inline-block size-6" />
        ) : (
          <PlusIcon className="inline-block size-6" />
        )}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="glass-box max-w-lg space-y-4 rounded-4xl p-8">
            <button
              onClick={() => setIsOpen(false)}
              className="!bg-background absolute top-2 right-2 flex items-center justify-center rounded-full border p-1 outline-0"
            >
              <XMarkIcon className="inline-block size-5" />
            </button>
            <DialogTitle className="text-lg font-bold">
              Add new contact
            </DialogTitle>
            <ContactFormComp onAdded={handleAddedContact} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
