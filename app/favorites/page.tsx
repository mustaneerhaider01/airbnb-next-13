import getCurrentUser from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings";
import EmptyState from "@/components/EmptyState";
import FavoritesClient from "@/components/favorites/FavoritesClient";

async function FavoritesPage() {
  const favorites = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!favorites.length) {
    return (
      <EmptyState
        title="No favorites"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return <FavoritesClient currentUser={currentUser} listings={favorites} />;
}

export default FavoritesPage;
