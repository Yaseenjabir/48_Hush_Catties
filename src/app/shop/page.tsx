"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../MyComponents/GlobalComponents/BreadCrumb";
import { FiExternalLink } from "react-icons/fi";
import { Spinner } from "@heroui/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { IoIosHeartEmpty, IoIosStar, IoMdHeart } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import {
  ADD_ITEM_TO_CART,
  DELETE_CART_ITEMS,
  TOGGLE_WISHLIST,
  getCookie,
  GET_WISHLIST,
  Product,
} from "@/constants/constants";
import { useRouter } from "next/navigation";
import { apiClient } from "../../../client/axiosClient";
import { toast } from "sonner";
import { Pagination } from "@heroui/react";
import useStore from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import Filter from "./Filter";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust as needed
  const { items, insertItems, removeItem, globalData } = useStore();
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState("");
  const [cartSpinnerIndex, setCartSpinnerIndex] = useState<null | string>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const router = useRouter();
  const [isHovered, setIsHovered] = useState("");
  const [debouncedHover, setDebouncedHover] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Set debouncedHover to true after 200ms when isHovered becomes true
    if (isHovered) {
      timerId = setTimeout(() => setDebouncedHover(isHovered), 200);
    }
    // Set debouncedHover to false after 200ms when isHovered becomes false
    else {
      timerId = setTimeout(() => setDebouncedHover(""), 200);
    }

    // Cleanup the timer on unmount or state change
    return () => clearTimeout(timerId);
  }, [isHovered]);

  useEffect(() => {
    setLoading(true);
    setData(globalData);
    setLoading(false);
  }, [globalData]);

  // Fetch wishlist on component mount
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
      } catch {
        toast.error("Something went wrong");
      }
    };

    fetchWishlist();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate average rating for stars
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, rating) => sum + rating, 0);
    return total / reviews.length;
  };

  // Render stars based on average rating
  const renderStars = (averageRating: number) => {
    const stars: any = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <IoIosStar
          key={i}
          className={`text-sm ${i <= averageRating ? "text-yellow-400" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  // Add to Cart Functionality
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
      toast.warning("Please select color and size");
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
    } catch (ex) {
      console.log(ex);
      toast.error("Something went wrong");
    } finally {
      setCartSpinnerIndex(null);
    }
  };

  // Remove from Cart Functionality
  const removeItemFromCart = async (productId: string) => {
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

  // Toggle Wishlist Functionality
  const toggleWishlist = async (productId: string) => {
    const authToken = getCookie("authToken");
    if (!authToken) {
      router.push("/auth?flag=wishlist");
      return;
    }
    setWishlistLoading(productId);
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
    } catch {
      toast.error("Something went wrong");
    } finally {
      setWishlistLoading("");
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
            <div
              onClick={() => setShowFilter(true)}
              className="w-full grid grid-cols-2"
            >
              <div>
                <span className="uppercase font-semibold border-b-black border-b py-1 text-sm cursor-pointer hover:text-red-700 hover:border-b-red-700 transition-all ease-in-out duration-300">
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
            <div className="w-full mt-10 relative overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-3">
              {(filteredData.length > 0 ? filteredData : currentData).map(
                (item) => {
                  const isInCart = items.some(
                    (cartItem) => cartItem.productId._id === item._id
                  );
                  const isInWishlist = wishlistItems.includes(item._id);
                  const averageRating = calculateAverageRating(item.reviews);
                  const isHovered = debouncedHover === item._id;

                  return (
                    <div
                      onMouseEnter={() => setIsHovered(item._id)}
                      onMouseLeave={() => setIsHovered("")}
                      key={item._id}
                      className="w-full overflow-hidden"
                    >
                      <div className="w-full relative">
                        {/* Base Image */}
                        <Image
                          src={item.imageUrls[0]}
                          width={500}
                          height={500}
                          layout="responsive"
                          alt="fashion"
                          className="transition-opacity duration-700 ease-in-out"
                          style={{ opacity: isHovered ? 0 : 1 }}
                        />
                        {/* Hover Image */}
                        <div
                          className="absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out"
                          style={{ opacity: isHovered ? 1 : 0 }}
                        >
                          <Image
                            src={item.imageUrls[1]}
                            width={500}
                            height={500}
                            layout="responsive"
                            alt="fashion"
                          />
                        </div>
                        {/* Hover Actions */}
                        <div
                          className={`bg-white text-black absolute bottom-10 left-5 z-10 p-3 flex items-center justify-center text-xl gap-2 ${
                            isHovered ? "translate-x-0" : "-translate-x-[120%]"
                          } transition-all ease-in-out duration-300`}
                        >
                          {isInCart ? (
                            <MdOutlineCancel
                              onClick={() => removeItemFromCart(item._id)}
                              className="border-r pr-2 text-3xl hover:text-red-700 cursor-pointer"
                            />
                          ) : (
                            <Dialog>
                              {item.stock ? (
                                <DialogTrigger
                                  className="border-r pr-2 text-3xl hover:text-red-700 cursor-pointer bg-transparent hover:bg-transparent"
                                  asChild
                                >
                                  {cartSpinnerIndex === item._id ? (
                                    <Spinner
                                      variant="spinner"
                                      className="text-red-700 text-2xl"
                                    />
                                  ) : (
                                    <IoBagOutline className="text-black" />
                                  )}
                                </DialogTrigger>
                              ) : (
                                <div
                                  onClick={() =>
                                    toast.warning("This item is out of stock.")
                                  }
                                  className="p-0 rounded-none shadow-none border-r pr-2 cursor-not-allowed"
                                >
                                  <IoBagOutline className="text-gray-400" />
                                </div>
                              )}

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
                                          onClick={() => setSelectedSize(size)}
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
                          )}
                          {wishlistLoading && wishlistLoading === item._id ? (
                            <Spinner
                              variant="spinner"
                              className="text-red-700"
                            />
                          ) : isInWishlist ? (
                            <IoMdHeart
                              onClick={() => toggleWishlist(item._id)}
                              className="border-r pr-2 text-3xl hover:text-red-700 cursor-pointer"
                            />
                          ) : (
                            <IoIosHeartEmpty
                              onClick={() => toggleWishlist(item._id)}
                              className="border-r pr-2 text-3xl hover:text-red-700 cursor-pointer"
                            />
                          )}
                          <FiExternalLink
                            onClick={() => router.push(`/shop/${item._id}`)}
                            className="hover:text-red-700 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="py-5 flex flex-col gap-3 border px-1 border-t-0">
                        <div>
                          <h1 className="text-sm text-gray-400">
                            Fashion Manufacturer
                          </h1>
                          <div className="flex items-center gap-1">
                            {renderStars(averageRating)}
                            <span className="text-sm text-gray-600">
                              ({item.reviews.length} reviews)
                            </span>
                          </div>
                        </div>
                        <h1 className="font-bold hover:text-red-700 text-gray-800 cursor-pointer hover:underline">
                          <Link href={`/shop/${item._id}`}>{item.name}</Link>
                        </h1>
                        <p className="text-gray-500 font-light">
                          € {Number(item.price).toFixed(2)}
                        </p>
                        {item.stock ? (
                          <div className="flex items-center text-green-500 gap-2">
                            <span className="flex items-center gap-2">
                              <FaCheck /> In Stock
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-500 gap-2">
                            <span className="flex items-center gap-2">
                              <MdCancel />
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {/* Pagination  */}
            <div className="flex items-center justify-center mt-10">
              <Pagination
                color="danger"
                initialPage={1}
                total={totalPages}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>

            <Filter
              setFilteredData={setFilteredData}
              filteredData={filteredData}
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              data={data}
              setData={setData}
            />
          </section>
        </>
      )}
    </>
  );
}
