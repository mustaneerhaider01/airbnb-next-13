"use client";

import { BiSearch } from "react-icons/bi";

function Search() {
  return (
    <div
      className="border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md 
    transition cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block text-sm px-6 font-semibold border-x flex-1 text-center">
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">Add Guests</div>
          <div className="p-2 rounded-full bg-rose-500 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
