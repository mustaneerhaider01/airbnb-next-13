"use client";

import useCountries from "@/hooks/useCountries";
import { Category, SafeUser } from "@/types";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

type Props = {
  user: SafeUser;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  category?: Category;
};

function ListingInfo({
  user,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
  description,
}: Props) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>

        <div className="flex items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />

      {category && <ListingCategory data={category} />}

      <hr />

      <div className="text-lg text-neutral-500 font-light">{description}</div>

      <hr />

      <Map center={coordinates} />
    </div>
  );
}

export default ListingInfo;
