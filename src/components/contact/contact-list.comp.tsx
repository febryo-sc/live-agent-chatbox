"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { fetchContacts } from "@/data/contact";

import ChatContactCardComp from "../chat/chat-contact-card.comp";
import ContactFormModalComp from "./contact-form-modal.comp";

export default function ContactListComp({
  onChange,
  withAddButton = false,
}: {
  onChange: (c: any) => void;
  withAddButton?: boolean;
}) {
  const searchParams = useSearchParams();
  const [contacts, setContacts] = useState<any[]>([]);
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");

  const handleChangeContact = (c: any) => {
    setContact(c);
    onChange(c);
  };

  const getContacts = async () => {
    try {
      setLoading(true);
      const data = await fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contact", error);
    }
    setLoading(false);
  };

  const handleAddedContact = async (c: any[]) => {
    if (c && c.length > 0) {
      await getContacts();
      setSelectedPhone(`${c[0].phone}`);
    }
  };

  useEffect(() => {
    const phoneParam = searchParams.get("phone");
    if (!phoneParam) return;
    setSelectedPhone(phoneParam);
  }, [searchParams]);

  useEffect(() => {
    if (selectedPhone && selectedPhone !== "") {
      const filterContact = contacts.filter(
        (c) => `${c.phone}` === `${selectedPhone}`
      );
      if (filterContact.length > 0) {
        handleChangeContact(filterContact[0]);
      }
    }
  }, [contacts, selectedPhone]);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="glass-box flex h-full max-h-full flex-col gap-3 overflow-y-auto rounded-4xl p-4">
      <div className="flex shrink-0 items-center justify-between gap-2">
        <div className="relative w-full">
          <MagnifyingGlassIcon className="input-search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="input-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {withAddButton && (
          <ContactFormModalComp onAdded={(c) => handleAddedContact(c)} />
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {contacts
            .filter(
              (c) =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.phone.toLowerCase().includes(search.toLowerCase())
            )
            .map((c) => (
              <div
                key={c.id}
                onClick={() => handleChangeContact(c)}
                className="cursor-pointer"
              >
                <ChatContactCardComp
                  data={c}
                  isActive={contact && contact.id === c.id}
                />
              </div>
            ))}
          {loading && (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-sm">Loading contacts...</p>
            </div>
          )}
          {!loading && contacts.length < 1 && (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-sm">No contacts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
