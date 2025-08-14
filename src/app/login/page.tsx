"use client";

import { Suspense } from "react";

import LoginFormComp from "@/components/login/login-form.comp";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginFormComp />
    </Suspense>
  );
}
