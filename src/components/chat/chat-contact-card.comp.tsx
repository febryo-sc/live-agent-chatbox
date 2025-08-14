"use client";

import AvatarComp from "../avatar.comp";
import OnlineBadgeComp from "../online-badge.comp";

export default function ChatContactCardComp({
  data,
  isActive,
}: {
  data: any;
  isActive: boolean;
}) {
  const { name, phone, status, photoUrl } = data;
  return (
    <div
      className={`glass-box glass-box-hover relative rounded-4xl border py-2 ps-3 pe-4 ${
        isActive ? "glass-box-active" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div>
          <AvatarComp imageUrl={photoUrl} imageAlt={name} />
        </div>
        <div>
          <p>{name}</p>
          <p className="text-xs text-black/70 dark:text-white/70">{phone}</p>
        </div>
        <div className="ms-auto justify-self-end">
          <OnlineBadgeComp isOnline={status} isShow withText={false} />
        </div>
      </div>
    </div>
  );
}
