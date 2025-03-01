import React from "react";
import BreadCrumb from "../../../MyComponents/GlobalComponents/BreadCrumb";
import Image from "next/image";
import { RxCrossCircled } from "react-icons/rx";
import { playfairDisplay } from "../my-account/Main/Heading";

export default function Page() {
  return (
    <>
      <BreadCrumb title="Cart" crumb="cart" />
      <section className="w-full min-h-screen p-5 py-10 flex flex-col gap-10 lg:flex-row lg:gap-5 max-w-[1100px] mx-auto relative">
        {/* Mobile Screens  */}
        <div className="w-full md:hidden">
          <div className="border w-full">
            <ul className="w-full text-sm">
              <li className="border-b px-5 py-3 flex items-center justify-end">
                <RxCrossCircled className="text-lg text-gray-600 cursor-pointer" />
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-center">
                <Image
                  src={
                    "https://zainbia.com/wp-content/uploads/2024/04/IMG_6956-500x750.jpg"
                  }
                  alt="fashion"
                  width={70}
                  height={70}
                />
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Product :</span>
                <span className="text-gray-700">Product 1</span>
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Price :</span>
                <span className="text-gray-700">Rs 4,250</span>
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Product :</span>
                <span className="text-gray-700">
                  <div className="border py-1 px-2 flex items-center justify-between gap-5">
                    <span className="cursor-pointer">-</span>
                    <span>4</span>
                    <span className="cursor-pointer">+</span>
                  </div>
                </span>
              </li>
              <li className="px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Subtotal :</span>
                <span className="text-gray-700">Rs 17000</span>
              </li>
            </ul>
          </div>
          <div className="border w-full">
            <ul className="w-full text-sm">
              <li className="border-b px-5 py-3 flex items-center justify-end">
                <RxCrossCircled className="text-lg text-gray-600 cursor-pointer" />
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-center">
                <Image
                  src={
                    "https://zainbia.com/wp-content/uploads/2024/04/IMG_6956-500x750.jpg"
                  }
                  alt="fashion"
                  width={70}
                  height={70}
                />
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Product :</span>
                <span className="text-gray-700">Product 1</span>
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Price :</span>
                <span className="text-gray-700">Rs 4,250</span>
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Product :</span>
                <span className="text-gray-700">
                  <div className="border py-1 px-2 flex items-center justify-between gap-5">
                    <span className="cursor-pointer">-</span>
                    <span>4</span>
                    <span className="cursor-pointer">+</span>
                  </div>
                </span>
              </li>
              <li className="px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Subtotal :</span>
                <span className="text-gray-700">Rs 17000</span>
              </li>
            </ul>
          </div>
          <div className="border w-full">
            <ul className="w-full text-sm">
              <li className="border-b px-5 py-3 flex items-center justify-end">
                <RxCrossCircled className="text-lg text-gray-600 cursor-pointer" />
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-center">
                <Image
                  src={
                    "https://zainbia.com/wp-content/uploads/2024/04/IMG_6956-500x750.jpg"
                  }
                  alt="fashion"
                  width={70}
                  height={70}
                />
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Product :</span>
                <span className="text-gray-700">Product 1</span>
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Price :</span>
                <span className="text-gray-700">Rs 4,250</span>
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Product :</span>
                <span className="text-gray-700">
                  <div className="border py-1 px-2 flex items-center justify-between gap-5">
                    <span className="cursor-pointer">-</span>
                    <span>4</span>
                    <span className="cursor-pointer">+</span>
                  </div>
                </span>
              </li>
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Subtotal :</span>
                <span className="text-gray-700">Rs 17000</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Desktop Screens  */}
        <div className="overflow-x-auto hidden md:block lg:w-[70%]">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-start"></th>
                <th className="border border-gray-300 px-4 py-2 text-start"></th>
                <th className="border border-gray-300 px-4 py-2 text-start">
                  Product
                </th>
                <th className="border border-gray-300 px-4 py-2 text-start">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-start">
                  Quantity
                </th>
                <th className="border border-gray-300 px-4 py-2 text-start">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <RxCrossCircled className="text-xl cursor-pointer" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Image
                    src={
                      "https://zainbia.com/wp-content/uploads/2024/04/IMG_6956-500x750.jpg"
                    }
                    alt="fashion"
                    width={70}
                    height={70}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">Product 1</td>
                <td className="border border-gray-300 px-4 py-2">4,250</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="border py-1 px-2 flex items-center justify-between gap-0">
                    <span className="cursor-pointer">-</span>
                    <span>4</span>
                    <span className="cursor-pointer">+</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">17,230</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <RxCrossCircled className="text-xl cursor-pointer" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Image
                    src={
                      "https://zainbia.com/wp-content/uploads/2024/04/IMG_6956-500x750.jpg"
                    }
                    alt="fashion"
                    width={70}
                    height={70}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">Product 1</td>
                <td className="border border-gray-300 px-4 py-2">4,250</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="border py-1 px-2 flex items-center justify-between gap-0">
                    <span className="cursor-pointer">-</span>
                    <span>4</span>
                    <span className="cursor-pointer">+</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">17,230</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <RxCrossCircled className="text-xl cursor-pointer" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Image
                    src={
                      "https://zainbia.com/wp-content/uploads/2024/04/IMG_6956-500x750.jpg"
                    }
                    alt="fashion"
                    width={70}
                    height={70}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">Product 1</td>
                <td className="border border-gray-300 px-4 py-2">4,250</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="border py-1 px-2 flex items-center justify-between gap-0">
                    <span className="cursor-pointer">-</span>
                    <span>4</span>
                    <span className="cursor-pointer">+</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">17,230</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <RxCrossCircled className="text-xl cursor-pointer" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Image
                    src={
                      "https://zainbia.com/wp-content/uploads/2024/04/IMG_6956-500x750.jpg"
                    }
                    alt="fashion"
                    width={70}
                    height={70}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">Product 1</td>
                <td className="border border-gray-300 px-4 py-2">4,250</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="border py-1 px-2 flex items-center justify-between gap-0">
                    <span className="cursor-pointer">-</span>
                    <span>4</span>
                    <span className="cursor-pointer">+</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">17,230</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <RxCrossCircled className="text-xl cursor-pointer" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Image
                    src={
                      "https://zainbia.com/wp-content/uploads/2024/04/IMG_6956-500x750.jpg"
                    }
                    alt="fashion"
                    width={70}
                    height={70}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">Product 1</td>
                <td className="border border-gray-300 px-4 py-2">4,250</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="border py-1 px-2 flex items-center justify-between gap-0">
                    <span className="cursor-pointer">-</span>
                    <span>4</span>
                    <span className="cursor-pointer">+</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">17,230</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <RxCrossCircled className="text-xl cursor-pointer" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Image
                    src={
                      "https://zainbia.com/wp-content/uploads/2024/04/IMG_6956-500x750.jpg"
                    }
                    alt="fashion"
                    width={70}
                    height={70}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">Product 1</td>
                <td className="border border-gray-300 px-4 py-2">4,250</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="border py-1 px-2 flex items-center justify-between gap-0">
                    <span className="cursor-pointer">-</span>
                    <span>4</span>
                    <span className="cursor-pointer">+</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">17,230</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Cart totals  */}
        <div className="w-full lg:w-[30%] sticky top-5 z-10 h-fit">
          <div className="border w-full">
            <div className="border-b px-5 p-3 flex items-center">
              <h1 className={`font-bold ${playfairDisplay.className} text-lg`}>
                Cart Totals
              </h1>
            </div>
            <ul className="w-full text-sm py-5 px-8">
              <li className="border-b px-5 py-3 flex items-center justify-between">
                <span className="font-bold">Subtotal :</span>
                <span className="text-gray-700">Rs21,250</span>
              </li>

              <li className="border-b px-5 py-3 flex flex-col items-start justify-center w-full">
                <span className="font-bold">Shipping :</span>
                <text className="text-gray-700 pl-10">
                  Shipping to{" "}
                  <span className="font-bold">
                    This is street address, Islamabad, Islamabad Capital
                    Territory, 23200.
                  </span>
                </text>
              </li>
              <li className="px-5 py-3 flex items-center justify-between border-b">
                <span className="font-bold">Total :</span>
                <span className="text-gray-700">Rs 17000</span>
              </li>
              <li className="px-5 py-3 flex items-center justify-between">
                <button className="w-full bg-black p-3 text-white font-semibold hover:bg-transparent hover:text-black border border-black transition-all ease-in-out duration-300">
                  Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
