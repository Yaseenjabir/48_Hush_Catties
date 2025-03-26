"use client";
import { Pagination } from "@heroui/react";

export default function PaginationWrapper({
  totalPages,
}: {
  totalPages: number;
}) {
  return <Pagination color="danger" initialPage={1} total={totalPages} />;
}
