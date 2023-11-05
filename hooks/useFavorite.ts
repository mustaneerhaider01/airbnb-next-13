import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface IUserFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const onOpenLoginModal = useLoginModal((s) => s.onOpen);

  const hasFavorited = useMemo(() => {
    const ids = currentUser?.favoriteIds || [];

    return ids.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return onOpenLoginModal();
      }

      setIsLoading(true);

      const id = toast.loading(
        hasFavorited
          ? "Removing listing from your favorites..."
          : "Adding listing to your favorites..."
      );

      try {
        let response: AxiosResponse<any, any>;

        if (hasFavorited) {
          response = await axios.delete(`/api/favorites/${listingId}`);
        } else {
          response = await axios.post(`/api/favorites/${listingId}`);
        }

        router.refresh();
        toast.success(response.data.message, { id });
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Something went wrong!",
            { id }
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [currentUser, hasFavorited, listingId, router, onOpenLoginModal]
  );

  return { hasFavorited, toggleFavorite, isLoading };
};

export default useFavorite;
