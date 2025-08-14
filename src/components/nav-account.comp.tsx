"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  LockClosedIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

import OnlineBadgeComp from "./online-badge.comp";

export default function NavAccountComp() {
  const [anchor, setAnchor] = useState<"top" | "right end">("top");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setAnchor(e.matches ? "right end" : "top");
    };
    setAnchor(mediaQuery.matches ? "right end" : "top");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <Popover className="relative">
        <PopoverButton className="outline-0">
          <div className="glass-box glass-box-hover flex size-14 items-center justify-center rounded-full">
            <UserIcon className="size-6" />
          </div>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor={anchor}
          className="glass-box z-50 -mt-4 -ml-4 rounded-4xl text-sm transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
        >
          <div className="border-b p-3 px-4">
            <div className="flex items-start justify-between gap-1">
              <UserCircleIcon className="size-10" />
              <div>
                <p>-</p>
                <p className="text-xs">-</p>
                <OnlineBadgeComp isOnline={false} isShow={false} />
              </div>
            </div>
          </div>
          <div className="py-3">
            <button className="glass-box-hover flex items-center gap-1 px-4 py-2 transition">
              <LockClosedIcon className="size-4" />
              <span>Logout</span>
            </button>
          </div>
        </PopoverPanel>
      </Popover>
    </>
  );
}
