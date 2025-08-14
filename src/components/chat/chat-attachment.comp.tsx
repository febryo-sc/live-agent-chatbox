import { PlusIcon, SparklesIcon } from "@heroicons/react/24/solid";

import { useRef, useState } from "react";

export default function ChatAttachmentComp({
  onUploaded,
  disabled = false,
}: {
  onUploaded: (f: string) => void;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && !data.data.error) {
        onUploaded(data.data.url_image || "");
      } else {
        console.error("Upload failed:", data.error);
        alert(`Upload failed: ${data.error}`);
      }

      inputRef.current!.value = ""; // Reset input value
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="secondary-button outline-0"
        onClick={handleClick}
        disabled={loading || disabled}
      >
        {loading ? (
          <SparklesIcon className="inline-block size-6 animate-pulse" />
        ) : (
          <PlusIcon className="inline-block size-6" />
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        //accept="image/*"
      />
    </>
  );
}
