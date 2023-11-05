"use client";

import EmptyState from "@/components/EmptyState";
import Error from "next/error";
import { useEffect } from "react";

type Props = {
  error: Error;
};

function ErrorPage({ error }: Props) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
}

export default ErrorPage;
