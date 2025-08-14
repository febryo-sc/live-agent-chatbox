"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import LoadingPage from "../loading-page.comp";

export default function LoginFormComp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const authenticate = async (u: string, p: string) => {
    setLoading(true);
    setError("");
    let res = null;

    if (u === "jannes" && p === "santoso") {
      // TODO: Handle auth logic
      setLoading(false);
      res = { ok: true };
    }

    if (res?.ok) {
      const callbackUrl = searchParams.get("callbackUrl") || "/box/chats";
      router.push(callbackUrl);
    } else {
      setLoading(false);
      setError("Invalid username or password");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authenticate(username, password);
  };

  useEffect(() => {
    // TODO: handle this case from API to read token
    const token = searchParams.get("token");
    if (token != "12qwasZX") {
      setLoadingPage(false);
      return;
    }

    const runAuth = async () => {
      try {
        await authenticate("jannes", "santoso");
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    };

    runAuth();
  }, [searchParams]);

  return loadingPage ? (
    <LoadingPage />
  ) : (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="glass-box flex w-96 flex-col gap-4 rounded-4xl p-8"
      >
        <h2 className="mb-2 text-center text-2xl font-bold">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="input-form"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-form"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        {error && (
          <p className="text-center text-sm text-red-500 text-shadow-2xs">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="primary-button h-[50px]"
          disabled={loading}
        >
          <span>Login</span>{" "}
          {loading && (
            <SparklesIcon className="ms-2 inline-block size-5 animate-pulse" />
          )}
        </button>
      </form>
    </div>
  );
}
