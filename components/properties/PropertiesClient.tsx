"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import Container from "../Container";
import Heading from "../Heading";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import ListingCard from "../listings/ListingCard";

type Props = {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
};

function PropertiesClient({ currentUser, listings }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDeleteProperty = useCallback(
    async (id: string) => {
      setDeletingId(id);
      const toastId = toast.loading("Deleting property...");

      try {
        const res = await axios.delete(`/api/listings/${id}`);

        toast.success(res.data?.message, { id: toastId });
        router.refresh();
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data?.message || "Someting went wrong.", {
            id: toastId,
          });
        }
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
      2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDeleteProperty}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default PropertiesClient;
