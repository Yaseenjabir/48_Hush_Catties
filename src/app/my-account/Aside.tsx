import Image from "next/image";
import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Playfair_Display } from "next/font/google";
import { deleteCookie } from "@/constants/constants";
import { usePathname, useRouter } from "next/navigation";
const playfairDisplay = Playfair_Display({
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

interface NavTypes {
  id: number;
  name: string;
  icon: any;
}

export default function Aside({
  setActiveTab,
  activeTab,
  isSlided,
  setIsSlided,
  data,
}: {
  setActiveTab: any;
  activeTab: string;
  isSlided: boolean;
  setIsSlided: any;
  data: any;
}) {
  const router = useRouter();
  const pathName = usePathname();

  const handleTabChange = (tab: string) => {
    setIsSlided(true);
    if (tab === "Logout") {
      deleteCookie("authToken");
      router.push("/auth");

      return;
    }
    router.push(`${pathName}?tab=${activeTab}`);
    setActiveTab(tab);
  };

  const navs: NavTypes[] = [
    {
      id: 1,
      name: "Dashboard",
      icon: <RiDashboardHorizontalLine className="text-xl" />,
    },
    {
      id: 2,
      name: "Orders",
      icon: <FaShoppingCart className="text-xl" />,
    },
    {
      id: 3,
      name: "Account details",
      icon: <FaUser className="text-xl" />,
    },
    {
      id: 4,
      name: "Wishlist",
      icon: <RxHamburgerMenu className="text-xl" />,
    },
    {
      id: 5,
      name: "Logout",
      icon: <IoIosLogOut className="text-xl" />,
    },
  ];

  return (
    <>
      <aside
        className={`h-screen border-r flex flex-col items-center justify-start fixed top-0 left-0 w-[70%] sm:w-[40%] lg:w-[20%] md:relative max-w-[380px] transition-all ease-in-out duration-300 bg-[url('https://zainbia.com/wp-content/uploads/2024/03/zainbia-background-image.webp')] z-50 shadow-xl md:shadow-none ${
          isSlided ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-5 w-full p-5">
          <h1 className={`${playfairDisplay.className} text-3xl font-semibold`}>
            My Account
          </h1>
          <div className="flex items-center justify-start gap-5 w-full">
            <Image
              src={
                "https://secure.gravatar.com/avatar/026283900ba53a8ca624f288e9d92ec5?s=60&d=mm&r=g"
              }
              alt="profile-avatar"
              height={50}
              width={50}
              className="rounded-full"
            />
            <div className="flex items-start gap-2 text-sm">
              <span>Hello</span>
              <span className="font-bold">
                {data?.user?.firstName} {data?.user?.lastName}
              </span>
            </div>
          </div>
        </div>
        <ul className="w-full mt-10 flex flex-col">
          {navs.map((item) => (
            <li
              key={item.id}
              onClick={() => handleTabChange(item.name)}
              className={`py-5 cursor-pointer transition-all ease-in-out duration-300 border-b px-5 font-semibold flex items-center gap-5  ${
                activeTab === item.name &&
                "border-r-[3px] border-r-blue-500 text-blue-500"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
        <RxCross1
          className="text-xl md:hidden absolute top-5 right-5 cursor-pointer hover:rotate-180 transition-all ease-in-out duration-700"
          onClick={() => setIsSlided(true)}
        />
      </aside>
    </>
  );
}
