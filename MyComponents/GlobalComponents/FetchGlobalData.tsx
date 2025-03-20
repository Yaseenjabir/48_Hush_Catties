"use client";
import useStore from "@/store/store";
import { useEffect } from "react";
import { apiClient } from "../../client/axiosClient";
import { GET_ALL_PRODUCTS } from "@/constants/constants";

export default function FetchGlobalData() {
  const { insertData, globalData } = useStore();

  const fetchGlobalData = async (
    apiEndPoint: string,
    insertFn: any,
    cacheName: string
  ) => {
    const cache = await caches.open(cacheName); // Open the cache for the given cache name
    const cachedResult = await cache.match(apiEndPoint); // Check if we have cached data

    if (cachedResult) {
      try {
        const cachedData = await cachedResult.json(); // Parse the cached data
        const currentTime = Date.now();
        const cacheTimestamp = cachedData.timestamp;

        // Check if the cache has expired (12 hours in this case)
        const cacheExpired =
          cacheTimestamp && currentTime - cacheTimestamp > 12 * 60 * 60 * 1000; // 12 hours

        if (!cacheExpired) {
          insertFn(cachedData.data); // Insert the cached data into the store
          return;
        }
      } catch (e) {
        console.error("Error parsing cached data:", e);
      }
    }

    // If cache is expired or missing, fetch data from API
    try {
      const res = await apiClient.get(apiEndPoint);

      if (res.status === 200) {
        const responseData = res.data;
        const responseWithTimestamp = {
          data: responseData,
          timestamp: Date.now(),
        };

        const response = new Response(JSON.stringify(responseWithTimestamp), {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Cache the fresh response and store the timestamp
        cache.put(apiEndPoint, response);
        insertFn(responseData); // Insert the fetched data into the store
      }
    } catch (ex) {
      console.error("Error fetching from API:", ex);
    }
  };

  useEffect(() => {
    if (globalData.length === 0) {
      fetchGlobalData(GET_ALL_PRODUCTS, insertData, GET_ALL_PRODUCTS);
    }
  }, []);

  return (
    <>
      <h1></h1>
    </>
  );
}
