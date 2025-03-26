"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "../../../client/axiosClient";
import { VERIFY_SESSION } from "@/constants/constants";
import { Spinner } from "@heroui/react";

export default function Page() {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [availability, setAvailability] = useState(false);

  const query = useSearchParams();
  const queryyy = query.get("session_id");

  useEffect(() => {
    async function verifySession() {
      setLoader(true);
      const res = await apiClient.get(`${VERIFY_SESSION}?_id=${queryyy}`);
      if (res.data.isVerified) {
        setAvailability(true);
      } else {
        setAvailability(false);
      }
      setLoader(false);
    }
    if (queryyy) {
      verifySession();
    } else {
      router.push("/");
    }
    // toast.success("Your order has been created successfully");
  }, [queryyy]);

  return loader ? (
    <div className="w-full flex items-center justify-center h-[70vh]">
      <Spinner variant="spinner" />
    </div>
  ) : availability ? (
    <div className="min-h-[80vh] flex items-center justify-center px-5">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6 max-w-[600px]">
          Thank you for your purchase. Your payment was successful, and your
          order is being processed. To check your order status, visit your
          dashboard
        </p>
        <button
          onClick={() => {
            router.push("/my-account?tab=Orders");
          }}
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          View Order
        </button>
      </div>
    </div>
  ) : (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <h1 className="text-2xl font-bold">Invalid session id</h1>
    </div>
  );
}
