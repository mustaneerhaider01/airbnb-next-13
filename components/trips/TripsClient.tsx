"use client";

import { SafeReservation, SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import Container from "../Container";
import Heading from "../Heading";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import ListingCard from "../listings/ListingCard";

type Props = {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
};

function TripsClient({ currentUser, reservations }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancelReservation = useCallback(
    async (id: string) => {
      setDeletingId(id);
      const toastId = toast.loading("Cancelling your reservation...");

      try {
        await axios.delete(`/api/reservations/${id}`);

        toast.success("Reservation cancelled", { id: toastId });
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
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
      2xl:grid-cols-6 gap-8"
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancelReservation}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default TripsClient;
