import React from "react";
import Heading from "./Heading";
import { deleteCookie } from "@/constants/constants";
import { useRouter } from "next/navigation";

export default function Dashboard({ data }) {
  const router = useRouter();

  return (
    <section className="w-full px-5 py-10">
      <Heading text="Dashboard" />
      <div>
        Hello{" "}
        <span className="font-semibold">
          {data?.user?.firstName} {data?.user?.lastName}{" "}
        </span>{" "}
        (not
        <span className="font-semibold">
          {" "}
          {data?.user?.firstName} {data?.user?.lastName} ?
        </span>{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => {
            deleteCookie("authToken");
            router.push("/auth");
          }}
        >
          Log out
        </span>
        )
      </div>
      <p className="mt-5">
        From your account dashboard you can view your recent orders, manage your
        shipping and billing addresses, and edit your password and account
        details.
      </p>
    </section>
  );
}
