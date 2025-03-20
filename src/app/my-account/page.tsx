"use client";
import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import Dashboard from "./Main/Dashboard";
import Orders from "./Main/Orders";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import ProfileDetails from "./Main/ProfileDetails";
import Wishlist from "./Main/Wishlist/Wishlist";
import { GET_USER_PROFILE, getCookie } from "@/constants/constants";
import { apiClient } from "../../../client/axiosClient";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/react";
import SingleOrder from "./Main/singleOrder";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get the query parameters
  const tabParam = searchParams.get("tab"); // Get the "tab" parameter from the URL

  const [activeTab, setActiveTab] = useState(tabParam || "Dashboard"); // Set activeTab based on the URL parameter
  const [isSlided, setIsSlided] = useState(true);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  // Update the URL when the active tab changes
  useEffect(() => {
    if (tabParam !== activeTab) {
      router.push(`${pathname}?tab=${activeTab}`);
    }
  }, [activeTab, pathname, router, tabParam]);

  // Fetch user profile data
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const token = getCookie("authToken");
      const res = await apiClient.get(GET_USER_PROFILE, {
        headers: { Authorization: token },
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setLoader(false);
    };
    fetchData();
  }, []);

  // Set the active tab based on the URL parameter when the component mounts
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return loader ? (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner variant="spinner" />
    </div>
  ) : (
    <section
      style={{
        backgroundImage:
          "url('https://zainbia.com/wp-content/uploads/2024/03/zainbia-background-image.webp')",
      }}
      className="w-full h-screen flex items-center justify-center"
    >
      <Aside
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        isSlided={isSlided}
        setIsSlided={setIsSlided}
        data={data}
      />
      <main className="w-full md:w-[80%] h-screen overflow-y-auto">
        <header className="w-full px-5 py-2 border-b shadow-md flex items-center justify-between">
          <GiHamburgerMenu
            className="text-xl cursor-pointer md:hidden"
            onClick={() => setIsSlided(!isSlided)}
          />
          <Image
            onClick={() => router.push("/")}
            src={"/mainLogo.jpg"}
            width={60}
            height={60}
            alt="logo"
            className="rounded-full cursor-pointer"
          />
        </header>

        {activeTab === "Dashboard" ? (
          <Dashboard data={data} />
        ) : activeTab === "Orders" ? (
          <Orders data={data} />
        ) : activeTab === "Account details" ? (
          <ProfileDetails data={data} />
        ) : activeTab === "Single Order" ? (
          <SingleOrder />
        ) : (
          <Wishlist data={data} />
        )}
      </main>
    </section>
  );
}
