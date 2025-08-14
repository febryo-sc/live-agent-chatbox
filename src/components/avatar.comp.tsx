"use client";

import { initialName } from "@/utils/formatter";

export default function AvatarComp({
  imageUrl,
  imageAlt,
  className,
}: {
  imageUrl: string;
  imageAlt: string;
  className?: string;
}) {
  const initial = initialName(imageAlt);

  return imageUrl ? (
    <img
      className={`bg-background rounded-full object-cover ${
        className || "size-12"
      }`}
      src={imageUrl}
      alt={imageAlt}
    />
  ) : (
    <div
      className={`overflow-hidde bg-background text-foreground relative inline-flex items-center justify-center rounded-full ${
        className || "size-12"
      }`}
    >
      <span className="font-medium">{initial}</span>
    </div>
  );
}
