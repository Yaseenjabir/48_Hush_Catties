import { Input } from "@/components/ui/input";
import { Product } from "@/constants/constants";
import useStore from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

export default function page({ isSearchBarActive, setIsSearchBarActive }) {
  const { globalData } = useStore();
  const [filteredData, setFilteredData] = useState<any>([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleOnChange(val: string) {
    if (!val.trim()) {
      setFilteredData([]); // or setFilteredData(globalData) to show all data
      setQuery("");
      return;
    }

    setQuery(val);
    // Convert the search term to lowercase for case-insensitive matching
    const searchTerm = val.toLowerCase();

    // Filter the globalData array
    const filtered = globalData.filter((item) => {
      // Check if the name or description includes the search term
      const isNameMatched = item.name.toLowerCase().includes(searchTerm);
      const isDescriptionMatched = item.description
        .toLowerCase()
        .includes(searchTerm);

      // Return true if either condition is met
      return isNameMatched || isDescriptionMatched;
    });

    // Update the filtered data state
    setFilteredData(filtered);
  }

  const suggestions = [
    "elegence",
    "velvet",
    "low prices",
    "New Dresses",
    "collections",
    "Abayas",
    "clothes",
    "Dress",
  ];

  return (
    <div
      className={`bg-black text-white mx-auto z-50 ${
        isSearchBarActive ? "max-h-screen" : "max-h-0 p-0"
      } absolute top-[85px] overflow-hidden left-0 w-full z-10 transition-all ease-in-out duration-700`}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="w-full p-5">
          <div className="flex items-center gap-2">
            <IoIosSearch className="text-2xl cursor-pointer" />
            <Input
              value={query}
              onChange={(e) => handleOnChange(e.target.value)}
              placeholder="Search here"
            />
            <RxCross1
              onClick={() => setIsSearchBarActive(false)}
              className="cursor-pointer text-2xl"
            />
          </div>
        </div>

        <div className="bg-black flex flex-col lg:flex-row p-5 h-[451px] lg:gap-10">
          <div className="w-full lg:w-[20%]">
            <h1 className="uppercase font-thin border-b border-b-gray-500 py-2">
              Suggestions
            </h1>
            <div className="w-full py-5 flex gap-3 flex-wrap">
              {suggestions.map((item) => (
                <span
                  onClick={() => handleOnChange(item)}
                  className="w-min text-nowrap cursor-pointer hover:underline"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          {filteredData.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-10 px-5 bg-black text-white h-[451px]">
              <span>
                No results could be found. Please try again with a different
                query.
              </span>
            </div>
          ) : (
            <div className="w-full lg:w-[80%]">
              <h1 className="uppercase font-thin border-b border-b-gray-500 py-2">
                Products
              </h1>
              <div className="w-full py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 overflow-auto max-h-[220px] lg:max-h-[420px]">
                {filteredData.map((item: Product) => {
                  return (
                    <div className="flex items-center w-full justify-start gap-2 text-sm">
                      <div>
                        <Image
                          src={item.imageUrls[0]}
                          width={100}
                          height={100}
                          alt="fashion"
                        />
                      </div>
                      <div>
                        <h1
                          className="font-medium cursor-pointer"
                          onClick={() => {
                            router.push(`/shop/${item._id}`);
                            setIsSearchBarActive(false);
                            setFilteredData([]);
                          }}
                        >
                          {item.name}
                        </h1>
                        <span className="text-red-500 font-thin">
                          € {item.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
