"use client";

import NavMenuComp from "@/components/nav-menu.comp";

export default function BoxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative z-10 flex h-full flex-col gap-4 overflow-hidden lg:flex-row">
      <aside className="w-auto">
        <NavMenuComp />
      </aside>
      <main className="max-h-full flex-1 overflow-hidden">
        <div className="h-full max-h-full w-full overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
