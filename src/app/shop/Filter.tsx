"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CheckboxGroup, Checkbox, extendVariants } from "@heroui/react";
import { Slider } from "@heroui/react";
import {
  categories,
  colorMapping,
  Product,
  sizes,
} from "@/constants/constants";
import { FaCheck } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

interface DatInt {
  setShowFilter: (item: boolean) => void;
  showFilter: boolean;
  data: Product[];
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Filter: React.FC<DatInt> = ({
  showFilter,
  setShowFilter,
  data,
  setData,
}) => {
  const MyCheckbox = extendVariants(Checkbox, {
    variants: {
      color: {
        myColor: {
          base: "bg-transparent text-[#fff]", // Base properties
          wrapper: "p-0", // Wrapper properties
          icon: "text-[#fff] bg-red-700 border-red-700 w-full h-full p-1", // Icon properties
          label: "text-[#000]", // Label properties
          hiddenInput: "outline-none", // Hidden input properties
        },
      },
    },
  });

  const MyRangeSlider = extendVariants(Slider, {
    variants: {
      color: {
        myColor: {
          filler: "bg-red-700",
          thumb: "bg-red-700",
        },
      },
    },
  });

  const searchParams = useSearchParams();

  const search = searchParams.get("category");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minMax, setMinMax] = useState<number | number[]>([10, 200]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [originalData, setOriginalData] = useState<Product[]>([]);

  useEffect(() => {
    // When your data is fetched or available, save the unfiltered data
    setOriginalData(data);
  }, [data]);

  // Filter Logic
  const filterProducts = () => {
    return data.filter((product: Product) => {
      // 1. Category Matching
      const isCategoryMatched =
        selectedCategories.length === 0 || // If no categories are selected, include all
        selectedCategories.includes(product.category); // Otherwise, check if the product's category is selected

      // 2. Color Matching
      const isColorMatched =
        selectedColors.length === 0 || // If no colors are selected, include all
        selectedColors.every((color) => product.color.includes(color)); // Otherwise, ensure all selected colors are in the product's colors

      // 3. Size Matching
      const isSizeMatched =
        selectedSizes.length === 0 || // If no sizes are selected, include all
        selectedSizes.every((size) => product.size.includes(size)); // Otherwise, ensure all selected sizes are in the product's sizes

      // 4. Price Matching
      const isPriceInRange = filterByPrice(product); // Check if the product's price is within the selected range
      // Return true only if all conditions are met
      return (
        isCategoryMatched && isColorMatched && isSizeMatched && isPriceInRange
      );
    });
  };

  const filterByPrice = (product: Product) => {
    const [minVal, maxVal] = minMax as [number, number];
    return Number(product.price) >= minVal && Number(product.price) <= maxVal;
  };

  useEffect(() => {
    if (search) {
      setSelectedCategories([search]);
    }
  }, [search]);

  const handleSearchFilter = () => {
    const filtered = filterProducts();
    setData(filtered);
    setShowFilter(false);
  };
  useEffect(() => {
    // Apply filtering logic whenever selectedCategories changes
    handleSearchFilter();
  }, [selectedCategories, handleSearchFilter]); // Add selectedCategories as a dependency

  const handleClearFilter = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setMinMax([10, 200]);
    setSelectedSizes([]);
    setData(originalData);
    setShowFilter(false);
  };

  return (
    <div
      onClick={() => setShowFilter(false)}
      style={{ transitionDuration: "2000ms" }}
      className={`w-full h-screen fixed top-0 left-0 z-[1001] ${
        showFilter ? "visible backdrop-blur-sm" : "invisible backdrop-blur-none"
      } transition-all ease-in-out`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[75%] h-screen overflow-y-auto transition-all ease-in-out duration-500 absolute top-0 left-0 bg-white flex flex-col items-start px-5 z-50 justify-start max-w-[600px] shadow-sm shadow-[#000000ab] ${
          showFilter ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full py-3 flex items-center justify-between border-b">
          <h1 className="font-extrabold text-lg text-red-700">
            Filter Your Selection
          </h1>
          <RxCross2
            onClick={() => setShowFilter(false)}
            className="text-2xl cursor-pointer hover:rotate-180 transition-all ease-in-out duration-1000"
          />
        </div>
        {/* Categories  */}
        <div className="flex flex-col py-5 w-full border-b">
          <h1 className="font-extrabold text-xl text-gray-700">Categories</h1>
          <CheckboxGroup
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e)}
            className="mt-5 w-full"
          >
            {categories.map((item, index) => (
              <MyCheckbox
                key={index}
                color="myColor"
                value={item}
                className="flex items-center justify-between w-full"
              >
                <span>{item}</span>
              </MyCheckbox>
            ))}
          </CheckboxGroup>
        </div>
        {/* Colors  */}
        <div className="flex flex-col py-5 w-full border-b">
          <h1 className="font-extrabold text-xl text-gray-700">Colors</h1>
          <div className="flex items-center justify-start flex-wrap gap-2 pt-5">
            {colorMapping.map((item, index) => (
              <span
                key={index}
                onClick={() =>
                  setSelectedColors((prev) =>
                    prev.includes(item.name)
                      ? prev.filter((color) => color !== item.name)
                      : [...prev, item.name]
                  )
                }
                style={{ backgroundColor: item.code }}
                className={`w-8 h-8 rounded-full border hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer relative border-gray-500`}
              >
                {selectedColors.includes(item.name) && (
                  <FaCheck className="absolute -top-1 -right-1 bg-black text-white p-[2px] rounded-full" />
                )}
              </span>
            ))}
          </div>
        </div>
        {/* Range Slider  */}
        <div className="flex flex-col py-5 w-full border-b">
          <h1 className="font-extrabold text-xl text-gray-700">Price</h1>
          <MyRangeSlider
            onChangeEnd={(newValue) => setMinMax(newValue as [number, number])}
            className=""
            defaultValue={minMax}
            formatOptions={{ style: "currency", currency: "EUR" }}
            label="Price Range"
            color="myColor"
            maxValue={1000}
            minValue={0}
            step={10}
          />
        </div>
        {/* Size  */}
        <div className="flex flex-col py-5 w-full border-b">
          <h1 className="font-extrabold text-xl text-gray-700">Sizes</h1>
          <CheckboxGroup
            value={selectedSizes}
            onChange={(e) => setSelectedSizes(e)}
            className="mt-5 w-full"
          >
            {sizes.map((item, index) => (
              <MyCheckbox
                key={index}
                color="myColor"
                value={item}
                className="flex items-center justify-between w-full"
              >
                <span>{item}</span>
              </MyCheckbox>
            ))}
          </CheckboxGroup>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2 py-5">
          <button
            onClick={handleSearchFilter}
            className="w-full border bg-red-700 py-2 border-red-700 font-bold text-white hover:bg-transparent hover:text-red-700 transition-all ease-in-out duration-300"
          >
            Filter
          </button>
          <button
            onClick={handleClearFilter}
            className="w-full border py-2 border-red-700 font-bold text-red-700 hover:bg-red-700 hover:text-white transition-all ease-in-out duration-300"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
