"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa"; // Cross icon
import { FaCheck, FaTimesCircle } from "react-icons/fa"; // In stock/Out of stock icons
import {
  ADD_ITEM_TO_CART,
  DELETE_CART_ITEMS,
  getCookie,
  TOGGLE_WISHLIST,
} from "@/constants/constants";
import { apiClient } from "../../../../../client/axiosClient";
import { toast } from "sonner";
import useStore from "@/store/store";
import { Spinner } from "@heroui/react";
import Heading from "../Heading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const WishlistItem = ({ product }) => {
  const [cartSpinnerIndex, setCartSpinnerIndex] = useState<null | string>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const { _id, name, price, stock, imageUrls, color, size } = product;
  const { insertItems, removeItem, items } = useStore();

  // Check if the product is already in the cart
  const isInCart = items.some((item) => item.productId._id === _id);

  // Add to Cart functionality
  const handleAddToCart = async (
    productId: string,
    color: string,
    size: string
  ) => {
    const authToken = getCookie("authToken");
    if (!authToken) {
      toast.error("Please log in to add items to your cart");
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
      insertItems(res.data.cart.items); // Update the cart in the store
      toast.success("Your item has been added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setCartSpinnerIndex(null);
      setIsDialogOpen(false); // Close the dialog after adding to cart
    }
  };

  // Remove from Cart functionality
  const removeItemFromCart = async (productId: string) => {
    const authToken = getCookie("authToken");
    if (!authToken) {
      toast.error("Please log in to remove items from your cart");
      return;
    }

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
        removeItem(productId); // Update the cart in the store
        toast.success("Your item has been removed from cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsDialogOpen(false);
      setCartSpinnerIndex(null);
    }
  };

  // Toggle Wishlist functionality
  const toggleWishlist = async (productId: string) => {
    const authToken = getCookie("authToken");

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

      toast.success(res.data.message);

      setTimeout(() => location.reload(), 1000);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-4 mb-4 w-full">
      {/* Cross icon to remove item from wishlist */}
      <button
        onClick={() => toggleWishlist(_id)}
        className="self-end md:self-start mb-2 md:mb-0 text-gray-500 hover:text-red-500 transition-colors md:mr-5"
      >
        <FaTimes className="text-xl" />
      </button>

      {/* Product image */}
      <div className="w-24 h-24 md:w-32 md:h-32 relative flex-shrink-0">
        <Image
          src={imageUrls[0]}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Product details */}
      <div className="flex-1 mx-4 text-center md:text-left">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">${Number(price).toFixed(2)}</p>
        <div className="flex items-center justify-center md:justify-start mt-2">
          {stock ? (
            <>
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-green-500">In Stock</span>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">Out of Stock</span>
            </>
          )}
        </div>
      </div>

      {/* Add to Cart / Remove from Cart button */}
      {cartSpinnerIndex === _id ? (
        <Spinner variant="spinner" /> // Show spinner while processing
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            {isInCart ? (
              <Button
                onClick={() => removeItemFromCart(_id)}
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
                <Label className="block text-sm font-medium mb-2">Color</Label>
                <div className="flex flex-wrap gap-2">
                  {color.map((colorOption) => (
                    <Button
                      key={colorOption}
                      variant={
                        selectedColor === colorOption ? "default" : "outline"
                      }
                      className={`rounded-full px-4 py-2 text-sm ${
                        selectedColor === colorOption
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedColor(colorOption)}
                    >
                      {colorOption}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <Label className="block text-sm font-medium mb-2">Size</Label>
                <div className="flex flex-wrap gap-2">
                  {size.map((sizeOption) => (
                    <Button
                      key={sizeOption}
                      variant={
                        selectedSize === sizeOption ? "default" : "outline"
                      }
                      className={`rounded-full px-4 py-2 text-sm ${
                        selectedSize === sizeOption
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedSize(sizeOption)}
                    >
                      {sizeOption}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() =>
                  handleAddToCart(_id, selectedColor, selectedSize)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                disabled={!selectedColor || !selectedSize}
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const Wishlist = ({ data }) => {
  const wishlist = data?.wishlist;

  return (
    <div className="container mx-auto p-4">
      <Heading text="Wishlist" />
      {wishlist.length === 0 ? (
        <p>No item added in the wishlist</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {wishlist.map((item) => (
            <WishlistItem key={item._id} product={item.productId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
