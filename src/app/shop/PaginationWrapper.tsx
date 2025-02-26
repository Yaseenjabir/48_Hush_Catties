"use client";
import { Pagination } from "@heroui/react";

export default function PaginationWrapper() {
  return <Pagination color="danger" initialPage={1} total={10} />;
}
