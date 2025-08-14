"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

import AvatarComp from "../avatar.comp";

export default function ClientComp({ contact }: { contact: any }) {
  const [moreData, setMoreData] = useState([]);

  useEffect(() => {
    if (contact) {
      // TODO: Fetch more data based on contact
      setMoreData([]);
    }
  }, [contact]);

  return (
    <div className="glass-box relative h-full max-h-full w-full overflow-hidden rounded-4xl p-4">
      {contact ? (
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="shrink-0">
            <div className="flex flex-col items-center justify-center gap-2 p-4">
              <AvatarComp
                imageAlt={contact.name}
                imageUrl={contact.photoUrl}
                className="h-24 w-24 border text-2xl shadow-sm"
              />
              <div className="text-center">
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm">Email: {contact.email}</p>
                <p className="text-sm">Phone: {contact.phone}</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="border-t p-4">
              <div className="mb-4">
                <p className="text-xs text-black/70 dark:text-white/70">
                  Address:
                </p>
                <p className="text-sm">{contact.address}</p>
              </div>
            </div>
            {moreData.map((data) => (
              <div key={data} className="p-4">
                <Disclosure as="div" className="glass-box mb-4 rounded-3xl p-4">
                  <DisclosureButton className="group flex w-full items-center justify-between">
                    <span className="text-sm font-medium group-data-hover:opacity-80">
                      Important Info Of Client
                    </span>
                    <ChevronDownIcon className="size-5 group-data-hover:opacity-80 group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 text-sm">
                    Put client info here for easy communication to client
                  </DisclosurePanel>
                </Disclosure>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="opacity-80">Select a contact to view details</p>
        </div>
      )}
    </div>
  );
}
