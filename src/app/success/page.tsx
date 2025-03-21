"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    toast.success("Your order has been created successfully");
  }, []);

  return (
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
  );
}
