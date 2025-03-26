import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Order Cancelled
        </h1>
        <p className="text-gray-700 mb-6">
          Your payment was not completed. If this was a mistake, you can try
          again.
        </p>
        <Link
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          href="/"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
