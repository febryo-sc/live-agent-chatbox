"use client";

import { Radio, RadioGroup } from "@headlessui/react";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ViewColumnsIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

import { useTheme } from "@/providers/theme-provider";
import { useBackground } from "@/providers/wallpaper-provider";

const settings = [
  {
    name: "Theme",
    description: "Change theme color",
    key: "theme",
  },
  {
    name: "Wallpaper",
    description: "Change Wallpaper",
    key: "wallpaper",
  },
  {
    name: "Chat",
    description: "Set chat layout",
    key: "chat",
  },
];

const themes = [
  {
    name: "Light",
    value: "light",
  },
  {
    name: "Dark",
    value: "dark",
  },
];

const wallpapers = [
  {
    key: 1,
    src: "/bg-sun-1.jpg",
  },
  {
    key: 2,
    src: "/bg-sun-2.jpg",
  },
  {
    key: 3,
    src: "/bg-sun-3.jpg",
  },
  {
    key: 4,
    src: "/bg-sun-4.jpg",
  },
  {
    key: 5,
    src: "/bg-sun-5.jpg",
  },
  {
    key: 6,
    src: "/bg-sun-6.jpg",
  },
  {
    key: 7,
    src: "/bg-sun-7.jpg",
  },
  {
    key: 8,
    src: "/bg-sun-8.jpg",
  },
];

const chatLayouts = [
  {
    name: "1 Column",
    value: "1-column",
  },
  {
    name: "2 Column",
    value: "2-column",
  },
  {
    name: "3 Column",
    value: "3-column",
  },
];

export default function SattingsPage() {
  const [activeMenu, setActiveMenu] = useState(settings[0]);
  const [chatLayout, setChatLayout] = useState(chatLayouts[1].value);
  const { theme, toggleTheme } = useTheme();
  const { backgroundUrl, setBackgroundUrl } = useBackground();
  const [isOpenRight, setIsOpenRight] = useState(true);

  const handleChatLayoutChange = (layout: string) => {
    setChatLayout(layout);
    localStorage.setItem("chatLayout", layout);
  };

  useEffect(() => {
    const storedChatLayout = localStorage.getItem("chatLayout") || "2-column";
    handleChatLayoutChange(storedChatLayout);
    setIsOpenRight(window.matchMedia("(min-width: 768px)").matches);
    const handleResize = () => {
      setIsOpenRight(window.matchMedia("(min-width: 768px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenRight = (type: string) => {
    if (type === "right") {
      setIsOpenRight(true);
    } else {
      setIsOpenRight(false);
    }
  };

  const handleActiveMenu = (menu: any) => {
    setActiveMenu(menu);
    handleOpenRight("right");
  };

  return (
    <div className="relative grid h-full max-h-full grid-cols-1 gap-4 md:grid-cols-3">
      <div className="glass-box h-full max-h-full w-full overflow-y-auto rounded-4xl">
        <div className="border-b p-4">
          <p className="page-title">Settings</p>
        </div>
        <div className="flex flex-col gap-2 p-2">
          {settings.map((s) => (
            <div
              key={s.key}
              className={`flex max-w-full cursor-pointer items-center justify-between px-6 py-3 ${
                activeMenu.key === s.key && isOpenRight
                  ? "glass-box rounded-full"
                  : ""
              }`}
              onClick={() => handleActiveMenu(s)}
            >
              <div>
                <p>{s.name}</p>
                <p className="text-xs">{s.description}</p>
              </div>
              <ChevronRightIcon className="size-6" />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`absolute right-0 z-10 col-span-1 h-full max-h-full w-full max-w-10/12 translate-x-full transform overflow-y-auto ps-12 transition-transform duration-300 ease-in-out md:relative md:col-span-2 md:max-w-full md:-translate-x-0 md:ps-0 md:pe-0 ${
          isOpenRight ? "!-translate-x-0" : ""
        }`}
      >
        <button
          onClick={() => handleOpenRight("close")}
          className="bg-background absolute top-4 left-2 z-20 flex items-center justify-center rounded-full border p-1 shadow-sm outline-0 md:hidden"
        >
          <XMarkIcon className="size-6" />
        </button>

        <div className="glass-box flex h-full max-h-full flex-col overflow-y-auto rounded-4xl">
          <div className="shrink-0 border-b p-4">
            <p className="page-title">{activeMenu.name}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {activeMenu.key === "theme" ? (
              <div className="transition">
                <RadioGroup
                  value={theme}
                  onChange={toggleTheme}
                  aria-label="Theme Options"
                  className="max-w-80 space-y-2"
                >
                  {themes.map((t) => (
                    <Radio
                      key={t.value}
                      value={t.value}
                      className="group glass-box relative flex cursor-pointer rounded-4xl px-5 py-2 transition focus:not-data-focus:outline-none"
                    >
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-semibold">{t.name}</p>
                        <CheckCircleIcon className="size-6 fill-black/80 opacity-0 transition group-data-checked:opacity-100 dark:fill-white" />
                      </div>
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              <></>
            )}

            {activeMenu.key === "wallpaper" ? (
              <div className="transition">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {wallpapers.map((w) => (
                    <div
                      key={w.key}
                      onClick={() => setBackgroundUrl(w.src)}
                      className="glass-box relative rounded-3xl p-2"
                    >
                      <img
                        src={w.src}
                        alt={`wallpaper-${w.key}`}
                        className="h-full w-full rounded-2xl object-cover"
                      />
                      <CheckCircleIcon
                        className={`absolute top-4 right-4 z-10 size-6 fill-white transition ${
                          w.src === backgroundUrl ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}

            {activeMenu.key === "chat" ? (
              <div className="transition">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {chatLayouts.map((c) => (
                    <div
                      key={c.value}
                      onClick={() => handleChatLayoutChange(c.value)}
                      className="glass-box relative cursor-pointer rounded-3xl p-2 text-center"
                    >
                      <ViewColumnsIcon className="mx-auto size-16" />
                      <p>{c.name}</p>
                      <CheckCircleIcon
                        className={`absolute top-4 right-4 z-10 size-6 fill-white transition ${
                          c.value === chatLayout ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
