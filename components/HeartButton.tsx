"use client";

import { SafeUser } from "@/types";
import useFavorite from "@/hooks/useFavorite";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};

function HeartButton({ listingId, currentUser }: Props) {
  const { hasFavorited, toggleFavorite, isLoading } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <button
      disabled={isLoading}
      onClick={toggleFavorite}
      className="relative opacity-80 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </button>
  );
}

export default HeartButton;
