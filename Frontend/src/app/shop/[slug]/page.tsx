"use client";
import React, { useEffect, useState } from "react";
import ShopSlider from "./Slider";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiOutlineSupport } from "react-icons/hi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GoPlus } from "react-icons/go";
import { Slash } from "lucide-react";
import { AiOutlineMinus } from "react-icons/ai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaCheck, FaFacebook, FaRegHeart } from "react-icons/fa";
import { FaArrowRotateLeft, FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { IoAlertCircleOutline, IoShuffleSharp } from "react-icons/io5";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { MdOutlinePolicy } from "react-icons/md";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SameCategorySlider from "./SameCategorySlider/SameCategorySlider";
import { IoRocketOutline } from "react-icons/io5";
import { apiClient } from "../../../../client/axiosClient";
import { colorMapping, Product, Review } from "@/constants/constants";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/react";
import { RxCross2 } from "react-icons/rx";

interface DataInterface {
  product: Product;
  featuredProducts: Product[];
  sameCategoryProducts: Product[];
  reviews: Review[];
}

export default function Page() {
  const [cartCounter, setCartCounter] = useState(0);
  const [data, setData] = useState<DataInterface>();
  const [loader, setLoader] = useState(true);

  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const res = await apiClient.get(`/api/product/getSingleProduct/${slug}`);
      if (res.status === 200) {
        setData(res.data);
      }
      setLoader(false);
    };
    fetchData();
  }, [slug]);

  const ProductColorDisplay = ({ colors }: { colors: string[] }) => {
    const filteredColors = colorMapping.filter((color) =>
      colors.includes(color.name)
    );

    return (
      <div className="flex items-center gap-3">
        <span className="font-bold text-gray-700">Color: </span>
        <div className="flex items-center gap-2">
          {filteredColors.map((color, index) => (
            <span
              key={index}
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: color.code }}
              title={color.name}
            ></span>
          ))}
        </div>
      </div>
    );
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const totalStars = 5; // Total stars to display
    const filledStars = Math.floor(rating);

    return (
      <div className="flex items-center text-xl">
        {Array.from({ length: totalStars }, (_, index) => {
          return index < filledStars ? (
            <IoIosStar key={index} className="text-yellow-400" />
          ) : (
            <IoIosStarOutline key={index} className="text-yellow-400" />
          );
        })}
      </div>
    );
  };

  const calculateAverageRating = (reviews: Review[] | undefined): any => {
    if (reviews?.length !== undefined) {
      if (reviews.length === 0) return 0; // Handle case with no reviews

      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      return totalRating / reviews.length; // Calculate average rating
    }
  };

  const averageRating = calculateAverageRating(data?.reviews);
  return (
    <>
      {loader ? (
        <div className="h-[calc(100vh-200px)] flex items-center justify-center">
          <Spinner variant="spinner" />
        </div>
      ) : (
        <>
          <section className="w-full p-5">
            <div className="w-full flex flex-col lg:flex-row lg:gap-10">
              <div className="w-full flex flex-col lg:w-[70%]">
                <div className="flex flex-col md:flex-row md:gap-5">
                  <div className="w-full md:max-w-[410px]">
                    <ShopSlider IMAGES={data?.product?.imageUrls || []} />
                  </div>
                  <div className="w-full py-5">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                          <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/shop">shop</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                          <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#">
                            {data?.product?.name}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex flex-col items-start justify-start w-full gap-2 mt-5">
                      <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex items-center justify-start gap-1">
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          <IoIosStar className="text-yellow-400" />
                          <span className="text-sm text-gray-600">
                            ({data?.product?.reviews.length} reviews)
                          </span>
                        </div>
                        <h1 className="text-xl font-semibold">
                          {data?.product?.name}
                        </h1>
                        <div className="flex gap-2 font-medium">
                          <span className="text-gray-400 text-lg relative">
                            €49.90
                            <hr className="absolute w-full top-[14px] left-0 border-gray-400 border-[1px]" />
                          </span>
                          <span className="text-red-700 text-lg">
                            €{Number(data?.product?.price)}
                          </span>
                        </div>
                        <p className="leading-5 text-gray-600 text-sm">
                          {(data?.product?.description || "").length > 520
                            ? `${(data?.product?.description || "").slice(0, 530)}...`
                            : data?.product?.description || ""}
                        </p>
                        <ProductColorDisplay
                          colors={
                            Array.isArray(data?.product?.color)
                              ? data?.product?.color
                              : []
                          }
                        />
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-700">
                            Sizes:{" "}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="w-full">
                              {JSON.stringify(data?.product.size)}
                            </span>
                          </div>
                        </div>
                        {data?.product?.stock ? (
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
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-2 items-center">
                            <span
                              onClick={() =>
                                setCartCounter((prev: number) => {
                                  if (prev === 0) {
                                    return 0;
                                  } else {
                                    return prev - 1;
                                  }
                                })
                              }
                              className="border p-1 font-bold cursor-pointer"
                            >
                              <AiOutlineMinus />
                            </span>
                            <span className="border py-1 px-3 text-sm">
                              {cartCounter}
                            </span>
                            <span
                              onClick={() =>
                                setCartCounter((prev: number) => prev + 1)
                              }
                              className="border p-1  font-bold cursor-pointer"
                            >
                              <GoPlus />
                            </span>
                          </div>
                          <button className="bg-red-700 py-2 px-4 uppercase text-sm text-white text-nowrap">
                            Add to cart
                          </button>
                          <button className="bg-red-700 py-2 px-4 uppercase text-sm text-white text-nowrap">
                            Buy Now
                          </button>
                        </div>
                        <div className="text-xl flex gap-5 text-gray-700 py-5">
                          <div className="flex items-center gap-2 cursor-pointer">
                            <FaRegHeart />
                            <p className="text-[17px] font-semibold">
                              Add to wishlist
                            </p>
                          </div>

                          <div className="flex items-center gap-2 cursor-pointer">
                            <IoShuffleSharp className="text-2xl" />
                            <p className="text-[17px] font-semibold">
                              Add to compare
                            </p>
                          </div>
                        </div>
                        <hr className="w-full" />
                        <div className="py-3 flex items-center gap-3">
                          <span className="font-bold text-gray-700">
                            Share :{" "}
                          </span>
                          <div className="flex items-center gap-2 text-2xl">
                            <FaFacebook className="text-blue-700 cursor-pointer" />
                            <RiInstagramFill className="text-pink-700 cursor-pointer" />
                            <FaXTwitter className="text-black cursor-pointer" />
                          </div>
                        </div>
                        <hr className="w-full" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Accordian  */}
                <div className="w-full lg:hidden">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="font-bold text-gray-700">
                        Description
                      </AccordionTrigger>
                      <AccordionContent>
                        {data?.product?.description}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="font-bold text-gray-700">
                        Reviews
                      </AccordionTrigger>
                      <AccordionContent>
                        {data?.reviews.length !== undefined &&
                        data?.reviews.length > 0 ? (
                          <div>
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-700">
                                  ITEM RATING :
                                </span>
                                <div className="flex items-center text-xl">
                                  <IoIosStar className="text-yellow-400" />
                                  <IoIosStar className="text-yellow-400" />
                                  <IoIosStar className="text-yellow-400" />
                                  <IoIosStar className="text-yellow-400" />
                                  <IoIosStar className="text-yellow-400" />
                                </div>
                              </div>
                              <p className="text-gray-500">
                                {/* 4.4 average based on 7 ratings. */}
                                {averageRating.toFixed(1)} average based on{" "}
                                {data?.reviews.length} ratings.
                              </p>
                            </div>
                            <hr className="mt-5" />
                            <div className="w-full flex flex-col">
                              {data?.reviews.map((item: Review) => {
                                return (
                                  <div
                                    key={item._id}
                                    className="py-5 border-b flex flex-col gap-5 "
                                  >
                                    <div className="flex items-center gap-5 text-gray-500">
                                      <div className="flex items-center text-xl">
                                        <StarRating rating={item.rating} />
                                      </div>
                                      <span>
                                        {item.user.firstName}{" "}
                                        {item.user.lastName}
                                      </span>
                                      <span>|</span>
                                      <span>
                                        {new Date(
                                          item.createdAt
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <div>
                                      <h1 className="font-semibold text-lg text-gray-700">
                                        {item.title}
                                      </h1>
                                      <p className="text-sm text-gray-600">
                                        {item.comment.length > 220
                                          ? item.comment.slice(0, 220) + "...."
                                          : item.comment}
                                      </p>
                                    </div>
                                    {/* <div className="flex items-center gap-5">
                                    <span>Was this review helpful?</span>
                                    <div className="flex items-center gap-2">
                                      <div className="bg-gray-100 w-8 h-7 flex items-center justify-center cursor-pointer">
                                        <AiOutlineDislike className="text-lg" />
                                        <span>{item.}</span>
                                      </div>
                                      <div>
                                        <div className="bg-gray-100 w-8 h-7 flex items-center justify-center cursor-pointer">
                                          <AiOutlineLike className="text-lg" />
                                          <span>0</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div> */}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <span>No reviews available</span>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                {/* Tabs  */}
                <div className="w-full mt-10 hidden lg:block">
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="border w-full">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description">
                      {data?.product?.description}
                    </TabsContent>
                    <TabsContent value="reviews">
                      {data?.reviews.length !== undefined &&
                      data?.reviews.length > 0 ? (
                        <div>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-700">
                                ITEM RATING :
                              </span>
                              <div className="flex items-center text-xl">
                                <IoIosStar className="text-yellow-400" />
                                <IoIosStar className="text-yellow-400" />
                                <IoIosStar className="text-yellow-400" />
                                <IoIosStar className="text-yellow-400" />
                                <IoIosStar className="text-yellow-400" />
                              </div>
                            </div>
                            <p className="text-gray-500">
                              {" "}
                              4.4 average based on 7 ratings.{" "}
                            </p>
                          </div>
                          <hr className="mt-5" />
                          <div className="w-full flex flex-col">
                            {data?.reviews.map((item: Review) => {
                              return (
                                <div
                                  key={item._id}
                                  className="py-5 border-b flex flex-col gap-5 "
                                >
                                  <div className="flex items-center gap-5 text-gray-500">
                                    <div className="flex items-center text-xl">
                                      <StarRating rating={item.rating} />
                                    </div>
                                    <span>
                                      {item.user.firstName} {item.user.lastName}
                                    </span>
                                    <span>|</span>
                                    <span>
                                      {new Date(
                                        item.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div>
                                    <h1 className="font-semibold text-lg text-gray-700">
                                      {item.title}
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                      {item.comment.length > 220
                                        ? item.comment.slice(0, 220) + "...."
                                        : item.comment}
                                    </p>
                                  </div>
                                  {/* <div className="flex items-center gap-5">
                                    <span>Was this review helpful?</span>
                                    <div className="flex items-center gap-2">
                                      <div className="bg-gray-100 w-8 h-7 flex items-center justify-center cursor-pointer">
                                        <AiOutlineDislike className="text-lg" />
                                        <span>{item.}</span>
                                      </div>
                                      <div>
                                        <div className="bg-gray-100 w-8 h-7 flex items-center justify-center cursor-pointer">
                                          <AiOutlineLike className="text-lg" />
                                          <span>0</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div> */}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <span>No reviews available</span>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              <div className="w-full lg:w-[30%] flex flex-col py-5 gap-10">
                <div className="w-full flex flex-col gap-7">
                  <div className="flex items-center gap-5">
                    <MdOutlinePolicy className="text-5xl text-gray-500" />
                    <p className="text-gray-500">
                      Security policy (Here goes our security policy module)
                    </p>
                  </div>
                  <div className="flex items-center gap-5">
                    <CiDeliveryTruck className="text-5xl text-gray-500" />
                    <p className="text-gray-500">
                      Delivery policy (Here goes our delivery policy module)
                    </p>
                  </div>
                  <div className="flex items-center gap-5">
                    <RiMoneyDollarCircleLine className="text-5xl text-gray-500" />
                    <p className="text-gray-500">
                      Return policy (Here goes our return policy module)
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <Image
                    src={
                      "https://akira-elementor.axonvip.com/modules/axoncreator/img/banner-right.jpg"
                    }
                    alt="fashion"
                    height={300}
                    width={300}
                    layout="responsive"
                    className="max-w-[60%] mx-auto lg:max-w-[80%] lg:ml-0 lg:mr-auto"
                  />
                </div>
                <div>
                  <h1 className="font-extrabold text-xl text-gray-700 py-3 border-b">
                    Featured Products
                  </h1>
                  <div className="flex flex-col w-full py-5 gap-7">
                    {data?.featuredProducts.map((item: Product, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div key={item._id} className="w-[25%] max-w-[120px]">
                          <Image
                            src={item.imageUrls[0]}
                            alt="featured-product"
                            height={200}
                            width={200}
                            layout="responsive"
                          />
                        </div>
                        <div className="w-[75%] flex flex-col py-1 gap-2">
                          <h1 className="font-semibold text-gray-500">
                            {item.name}
                          </h1>
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
                          <div className="flex gap-2 font-medium">
                            <span className="text-gray-400 relative">
                              €49.90
                              <hr className="absolute w-full top-[10px] left-0 border-gray-400 border-[1px]" />
                            </span>
                            <span className="text-red-700">€{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {data?.sameCategoryProducts.length !== undefined &&
              data?.sameCategoryProducts?.length > 0 && (
                <div className="w-full py-10 flex flex-col items-center justify-center gap-5">
                  <h1 className="font-bold text-xl text-gray-700">
                    Product Same Category
                  </h1>
                  <hr className="border border-blue-600 w-[60px]" />
                  <div className="w-full">
                    <SameCategorySlider data={data.sameCategoryProducts} />
                  </div>
                </div>
              )}
          </section>
          <div className="bg-red-700 grid grid-cols-2 w-full py-10 px-5 place-content-center justify-items-center text-white gap-5 lg:grid-cols-4">
            <div className="w-full py-10 flex items-center justify-center flex-col text-center">
              <IoRocketOutline className="text-4xl" />
              <span className="font-semibold text-lg">Free Shipping</span>
              <p className="text-sm">orders $50 or more</p>
            </div>
            <div className="w-full py-10 flex items-center justify-center flex-col text-center">
              <FaArrowRotateLeft className="text-4xl" />
              <span className="font-semibold text-lg"> Free Returns </span>
              <p className="text-sm">within 30 days</p>
            </div>
            <div className="w-full py-10 flex items-center justify-center flex-col text-center">
              <IoAlertCircleOutline className="text-4xl" />
              <span className="font-semibold text-lg">
                {" "}
                Get 20% Off 1 Item{" "}
              </span>
              <p className="text-sm">when you sign up</p>
            </div>
            <div className="w-full py-10 flex items-center justify-center flex-col text-center">
              <HiOutlineSupport className="text-4xl" />
              <span className="font-semibold text-lg"> We Support </span>
              <p className="text-sm">24/7 amazing services</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
