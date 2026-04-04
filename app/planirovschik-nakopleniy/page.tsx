"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PlanirovschikRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <p className="p-8 text-center text-slate-500">Перенаправление…</p>
  );
}
