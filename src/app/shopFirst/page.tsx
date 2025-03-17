"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FaCheck,
  FaExpandArrowsAlt,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import Filter from "./Filter";
import Link from "next/link";
import BreadCrumb from "../../../MyComponents/GlobalComponents/BreadCrumb";
import useStore from "@/store/store";
import {
  ADD_ITEM_TO_CART,
  DELETE_CART_ITEMS,
  GET_WISHLIST,
  getCookie,
  Product,
  TOGGLE_WISHLIST,
} from "@/constants/constants";
import { Pagination, Spinner } from "@heroui/react";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { apiClient } from "../../../client/axiosClient";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const { items, insertItems, removeItem, globalData } = useStore();
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [cartSpinnerIndex, setCartSpinnerIndex] = useState<null | string>(null);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const currentData: Product[] =
    data.length > 0
      ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : [];

  useEffect(() => {
    if (!loading && currentData.length === 0) {
      const timer = setTimeout(() => {
        setShowNoDataMessage(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, currentData.length]);

  useEffect(() => {
    setLoading(true);
    setData(globalData);
    setLoading(false);
  }, [globalData]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const authToken = getCookie("authToken");
      if (!authToken) return;

      try {
        const res = await apiClient.get(GET_WISHLIST, {
          headers: {
            Authorization: authToken,
          },
        });

        setWishlistItems(
          res.data.flatMap((item) =>
            item.items.map((subItem) => subItem.productId)
          )
        );
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const router = useRouter();

  const handleAddToCart = async (
    productId: string,
    color: string,
    size: string
  ) => {
    const authToken = getCookie("authToken");
    if (!authToken) {
      router.push("/auth?flag=addtocart");
      return;
    }
    if (!color || !size) {
      toast.warning("Select color and size");
      return;
    }
    setCartSpinnerIndex(productId);
    try {
      const res = await apiClient.post(
        ADD_ITEM_TO_CART,
        { productId, quantity: 1, color, size },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      insertItems(res.data.cart.items);
      toast.success("Your item has been added to cart");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setCartSpinnerIndex(null);
    }
  };

  const removeItemFromCart = async (productId: any) => {
    const authToken = getCookie("authToken");
    setCartSpinnerIndex(productId);
    try {
      const res = await apiClient.delete(
        `${DELETE_CART_ITEMS}?productId=${productId}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (res.status === 200) {
        removeItem(productId);
        toast.success("Your item has been removed from cart");
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Something went wrong");
    } finally {
      setCartSpinnerIndex(null);
    }
  };

  const toggleWishlist = async (productId: string) => {
    const authToken = getCookie("authToken");
    if (!authToken) {
      router.push("/auth?flag=wishlist");
      return;
    }

    setWishlistLoading(true);
    try {
      const res = await apiClient.post(
        TOGGLE_WISHLIST,
        { productId },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (res.data.message === "Item added to wishlist") {
        setWishlistItems((prev) => [...prev, productId]);
      } else if (res.data.message === "Item removed from wishlist") {
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
      }

      toast.success(res.data.message);
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
      toast.error("Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <>
      <BreadCrumb crumb="shop" title="Shop" />
      {loading ? (
        <div className="h-[calc(100vh-240px)] flex items-center justify-center">
          <Spinner variant="spinner" />
        </div>
      ) : (
        <>
          <section className="w-full py-10 px-5 max-w-[1200px] mx-auto">
            {/* filters  */}
            <div className="w-full grid grid-cols-2">
              <div>
                <span
                  onClick={() => setShowFilter(true)}
                  className="uppercase font-semibold border-b-black border-b py-1 text-sm cursor-pointer hover:text-red-700 hover:border-b-red-700 transition-all ease-in-out duration-300"
                >
                  Filter +
                </span>
              </div>
              <div className="flex items-center justify-end gap-2 invisible">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* items listing  */}

            <div className="w-full grid grid-cols-1 py-10 gap-10">
              {currentData?.length > 0
                ? currentData.map((item: Product, index) => {
                    const isInCart = items.some(
                      (cartItem) => cartItem.productId._id === item._id
                    );
                    const isInWishlist = wishlistItems.includes(item._id);

                    return (
                      <div key={index} className="flex w-full">
                        <div className="max-w-[225px]">
                          <Image
                            src={item.imageUrls[0]}
                            height={200}
                            width={200}
                            alt="bag"
                            layout="responsive"
                          />
                        </div>

                        <div className="flex flex-col items-start justify-start w-full gap-2 md:flex-row px-5">
                          <div className="w-full flex flex-col gap-2">
                            <div className="w-full flex items-center justify-start gap-1">
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <IoIosStar className="text-yellow-400" />
                              <span className="text-sm text-gray-600">
                                ({item.reviews.length} reviews)
                              </span>
                            </div>
                            <Link
                              href={`/shop/${item._id}`}
                              className="text-sm"
                            >
                              {item.name}
                            </Link>
                            <div className="flex gap-2 font-medium">
                              <span className="text-gray-400 text-lg relative">
                                $49.90
                                <hr className="absolute w-full top-[14px] left-0 border-gray-400 border-[1px]" />
                              </span>
                              <span className="text-red-700 text-lg">
                                £{Number(item.price)}
                              </span>
                            </div>
                            <p className="leading-5 text-gray-600 text-sm">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            {cartSpinnerIndex === item._id ? (
                              <Spinner variant="spinner" />
                            ) : item.stock ? (
                              <Dialog>
                                <DialogTrigger asChild>
                                  {isInCart ? (
                                    <Button
                                      onClick={() =>
                                        removeItemFromCart(item._id)
                                      }
                                      className={
                                        "py-2 px-4 uppercase text-sm text-nowrap bg-gray-400 text-white"
                                      }
                                    >
                                      Remove from Cart
                                    </Button>
                                  ) : (
                                    <Button
                                      className={
                                        "py-2 px-4 uppercase text-sm text-nowrap bg-red-700 text-white"
                                      }
                                    >
                                      Add to Cart
                                    </Button>
                                  )}
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle className="text-lg font-semibold text-center">
                                      Select Options
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-6">
                                    {/* Color Selection */}
                                    <div>
                                      <Label className="block text-sm font-medium mb-2">
                                        Available Color
                                      </Label>
                                      <div className="flex flex-wrap gap-2">
                                        {item.color.map((color) => (
                                          <Button
                                            key={color}
                                            variant={
                                              selectedColor === color
                                                ? "default"
                                                : "outline"
                                            }
                                            className={`rounded-full px-4 py-2 text-sm ${
                                              selectedColor === color
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                            }`}
                                            onClick={() =>
                                              setSelectedColor(color)
                                            }
                                          >
                                            {color}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Size Selection */}
                                    <div>
                                      <Label className="block text-sm font-medium mb-2">
                                        Available Size
                                      </Label>
                                      <div className="flex flex-wrap gap-2">
                                        {item.size.map((size) => (
                                          <Button
                                            key={size}
                                            variant={
                                              selectedSize === size
                                                ? "default"
                                                : "outline"
                                            }
                                            className={`rounded-full px-4 py-2 text-sm ${
                                              selectedSize === size
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                            }`}
                                            onClick={() =>
                                              setSelectedSize(size)
                                            }
                                          >
                                            {size}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Confirm Button */}
                                  <div className="mt-6 flex justify-end">
                                    <Button
                                      onClick={() =>
                                        handleAddToCart(
                                          item._id,
                                          selectedColor,
                                          selectedSize
                                        )
                                      }
                                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                                    >
                                      Confirm
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            ) : (
                              <Button
                                className={`py-2 px-4 uppercase cursor-auto text-white text-sm text-nowrap bg-gray-400`}
                              >
                                Out of stock
                              </Button>
                            )}

                            <div className="text-xl flex gap-5 text-gray-700">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <FaExpandArrowsAlt className="cursor-pointer" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Quick Review</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <button
                                      className="flex items-center justify-center"
                                      onClick={() => toggleWishlist(item._id)}
                                      disabled={wishlistLoading}
                                    >
                                      {isInWishlist ? (
                                        <FaHeart className="cursor-pointer text-red-500" />
                                      ) : (
                                        <FaRegHeart className="cursor-pointer" />
                                      )}
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      {isInWishlist
                                        ? "Remove from wishlist"
                                        : "Add to wishlist"}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <div>
                              {item.stock ? (
                                <div className="flex items-center text-green-500 gap-2">
                                  <FaCheck />
                                  <span>In Stock</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-red-500 gap-2">
                                  <RxCross2 className="text-lg" />
                                  <span>Out Of Stock</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : showNoDataMessage && (
                    <p className="text-center w-full font-bold">
                      Sorry, no data available
                    </p>
                  )}
            </div>

            <div className="flex items-center justify-center">
              <Pagination
                color="danger"
                initialPage={1}
                total={totalPages}
                onChange={handlePageChange}
              />
            </div>
          </section>
          <Filter
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            data={data}
            setData={setData}
          />
        </>
      )}
    </>
  );
}
