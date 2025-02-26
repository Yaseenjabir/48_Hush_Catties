"use client";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { CheckboxGroup, Checkbox, extendVariants } from "@heroui/react";
import { Slider } from "@heroui/react";
import { RadioGroup, Radio } from "@heroui/react";

interface DatInt {
  setShowFilter: (item: boolean) => void;
  showFilter: boolean;
}

const Filter: React.FC<DatInt> = ({ showFilter, setShowFilter }) => {
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

  return (
    <div
      onClick={() => setShowFilter(false)}
      style={{ transitionDuration: "2000ms" }}
      className={`w-full h-screen fixed top-0 left-0 z-50 ${
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
            defaultValue={["buenos-aires", "london"]}
            className="mt-5 w-full"
          >
            <MyCheckbox
              color="myColor"
              value="buenos-aires"
              className="flex items-center justify-between w-full"
            >
              <span>Scarp</span>
              <span className="text-gray-600">(20)</span>
            </MyCheckbox>
            <MyCheckbox color="myColor" value="sydney">
              <span>Top</span>
              <span className="text-gray-600">(20)</span>
            </MyCheckbox>
            <MyCheckbox color="myColor" value="san-francisco">
              <span>Abaya</span>
              <span className="text-gray-600">(20)</span>
            </MyCheckbox>
            <MyCheckbox color="myColor" value="london">
              <span>Jackets</span>
              <span className="text-gray-600">(20)</span>
            </MyCheckbox>
            <MyCheckbox color="myColor" value="tokyo">
              <span>Lower</span>
              <span className="text-gray-600">(20)</span>
            </MyCheckbox>
          </CheckboxGroup>
        </div>
        {/* Colors  */}
        <div className="flex flex-col py-5 w-full border-b">
          <h1 className="font-extrabold text-xl text-gray-700">Colors</h1>
          <div className="flex items-center justify-start flex-wrap gap-2 pt-5">
            <span className="w-8 h-8 bg-black rounded-full border border-gray-500"></span>
            <span className="w-8 h-8 bg-red-500 rounded-full border border-gray-500"></span>
            <span className="w-8 h-8 bg-green-500 rounded-full border border-gray-500"></span>
            <span className="w-8 h-8 bg-yellow-500 rounded-full border border-gray-500"></span>
            <span className="w-8 h-8 bg-purple-500 rounded-full border border-gray-500"></span>
            <span className="w-8 h-8 bg-amber-600 rounded-full border border-gray-500"></span>
            <span className="w-8 h-8 bg-cyan-700 rounded-full border border-gray-500"></span>
            <span className="w-8 h-8 bg-pink-500 rounded-full border border-gray-500"></span>
          </div>
        </div>
        {/* Range Slider  */}
        <div className="flex flex-col py-5 w-full border-b">
          <h1 className="font-extrabold text-xl text-gray-700">Price</h1>
          <MyRangeSlider
            className=""
            defaultValue={[100, 500]}
            formatOptions={{ style: "currency", currency: "USD" }}
            label="Price Range"
            color="myColor"
            maxValue={1000}
            minValue={0}
            step={50}
          />
        </div>
        {/* Availability  */}
        <div className="flex flex-col py-5 w-full border-b">
          <h1 className="font-extrabold text-xl text-gray-700">Availability</h1>
          <CheckboxGroup
            defaultValue={["buenos-aires", "london"]}
            className="mt-5 w-full"
          >
            <MyCheckbox
              color="myColor"
              value="buenos-aires"
              className="flex items-center justify-between w-full"
            >
              <span>In Stock</span>
              <span className="text-gray-600">(40)</span>
            </MyCheckbox>
            <MyCheckbox color="myColor" value="sydney">
              <span>Not Available</span>
              <span className="text-gray-600">(30)</span>
            </MyCheckbox>
          </CheckboxGroup>
        </div>
        {/* Size  */}
        <div className="flex flex-col py-5 w-full border-b">
          <h1 className="font-extrabold text-xl text-gray-700">Size</h1>
          <RadioGroup className="pt-3">
            <Radio value="buenos-aires">Small</Radio>
            <Radio value="sydney">Medium</Radio>
            <Radio value="san-francisco">Large</Radio>
            <Radio value="london">Extra Large</Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default Filter;
