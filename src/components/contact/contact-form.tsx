import { SparklesIcon } from "@heroicons/react/24/solid";

import { useState } from "react";

import { addContact } from "@/data/contact";

export default function ContactFormComp({
  activeContact,
  onAdded,
}: {
  activeContact?: any;
  onAdded: (c: any[]) => void;
}) {
  const [newPhone, setNewPhone] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleAddContact = async () => {
    try {
      setLoading(true);
      const data = await addContact({ phone: newPhone });
      if (data.length < 1) {
        console.error("Failed to add new contact");
        setLoading(false);
      } else {
        setLoading(false);
        onAdded(data);
        setNewPhone("");
      }
    } catch (error) {
      console.error("Failed to add new contact", error);
    }
  };

  return (
    <div>
      <p className="text-muted-foreground">
        You can add new contacts by entering their phone number below.
      </p>
      <div className="mt-4">
        <input
          type="tel"
          placeholder={activeContact?.phone || "Enter phone number"}
          className="input-form"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="mt-4">
        <button
          onClick={handleAddContact}
          className="btn primary-button h-[50px] w-full shadow-sm"
          disabled={loading || !newPhone || newPhone === activeContact?.phone}
        >
          <span>Add Contact</span>
          {loading && (
            <SparklesIcon className="ms-2 inline-block size-5 animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
}
