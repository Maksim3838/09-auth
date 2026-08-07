"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <div>{children}</div>;
}
