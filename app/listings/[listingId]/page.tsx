import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listings/ListingClient";

type PageProps = {
  params: {
    listingId: string;
  };
};

async function ListingPage({ params: { listingId } }: PageProps) {
  const listing = await getListingById(listingId);
  const reservations = await getReservations({ listingId });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}

export default ListingPage;
