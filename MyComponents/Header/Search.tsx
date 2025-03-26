import { Product } from "@/constants/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RxCross1 } from "react-icons/rx";

export default function page({
  setInputVal,
  valLength,
  filteredData,
  handleOnChange,
  setFilteredData,
}) {
  const router = useRouter();

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
        valLength > 0 ? "max-h-screen" : "max-h-0 p-0"
      } absolute top-[148px] md:top-[136px] lg:top-[145px] overflow-hidden left-0 w-full z-10 transition-all ease-in-out duration-700`}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="bg-black flex flex-col lg:flex-row p-5 h-[492px] md:h-[510px] lg:gap-10">
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
                            setInputVal("");
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
      <RxCross1
        onClick={() => setInputVal("")}
        className="absolute top-5 right-10 text-xl cursor-pointer"
      />
    </div>
  );
}
