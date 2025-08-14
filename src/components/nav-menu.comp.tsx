"use client";

import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import Link from "next/link";

import NavAccountComp from "./nav-account.comp";

const menus = [
  {
    link: "/box/chats",
    label: "Chats",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    link: "/box/contacts",
    label: "Contacts",
    icon: UserGroupIcon,
  },
  {
    link: "/box/settings",
    label: "Settings",
    icon: Cog6ToothIcon,
  },
];

export default function NavMenuComp() {
  return (
    <div className="relative h-full overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto">
      <ul className="flex flex-row items-center gap-x-2 text-xs lg:flex-col lg:gap-x-0 lg:gap-y-2 lg:py-2">
        {menus.map((m) => (
          <li key={m.link} className="lg:w-full">
            <Link
              href={m.link}
              className="glass-box glass-box-hover flex size-14 items-center justify-center rounded-full"
            >
              <m.icon className="mx-auto size-6" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute top-0 right-0 text-center lg:top-auto lg:bottom-0 lg:left-0">
        <NavAccountComp />
      </div>
    </div>
  );
}
