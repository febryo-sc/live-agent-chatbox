"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import LoadingPage from "@/components/loading-page.comp";

export default function HomePage() {
  const router = useRouter();
  // const { status } = useSession();

  useEffect(() => {
    // if (status === "loading") return;
    // if (status === "unauthenticated") {
    //   router.replace("/login");
    //   return;
    // }
    router.push("/box/chats");
  }, [router]);

  return <LoadingPage />;
}
