"use client";
import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import Dashboard from "./Main/Dashboard";
import Orders from "./Main/Orders";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import { IoMdSunny } from "react-icons/io";
import Addresses from "./Main/Addresses";
import ProfileDetails from "./Main/ProfileDetails";
import Wishlist from "./Main/Wishlist/Wishlist";
import { GET_USER_PROFILE, getCookie } from "@/constants/constants";
import { apiClient } from "../../../client/axiosClient";

export default function Page() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSlided, setIsSlided] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("authToken");
      const res = await apiClient.get(GET_USER_PROFILE, {
        headers: { Authorization: token },
      });
      if (res.status === 200) {
        setData(res.data);
        const nav = localStorage.getItem("nav");
        if (nav !== null) {
          setActiveTab(nav);
        }
      }
    };
    fetchData();
  }, []);

  return (
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
      />
      <main className="w-full md:w-[80%] h-screen overflow-y-auto">
        <header className="w-full px-5 py-2 border-b shadow-md flex items-center justify-between">
          <GiHamburgerMenu
            className="text-xl cursor-pointer md:hidden"
            onClick={() => setIsSlided(!isSlided)}
          />
          <Image
            src={"/logo.png"}
            width={60}
            height={60}
            alt="logo"
            className="rounded-full"
          />
          <IoMdSunny className="text-2xl" />
        </header>

        {activeTab === "Dashboard" ? (
          <Dashboard />
        ) : activeTab === "Orders" ? (
          <Orders />
        ) : activeTab === "Addresses" ? (
          <Addresses data={data} />
        ) : activeTab === "Account details" ? (
          <ProfileDetails data={data} />
        ) : (
          <Wishlist />
        )}
      </main>
    </section>
  );
}
