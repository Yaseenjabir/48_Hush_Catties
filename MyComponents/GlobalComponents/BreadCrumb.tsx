import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
export default function BreadCrumb({
  crumb,
  title,
}: {
  crumb: string;
  title: string;
}) {
  return (
    <div className="w-full p-5 flex items-center bg-red-700 text-white justify-center text-center flex-col gap-3">
      <h1 className="text-3xl font-bold ">{title}</h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="text-white">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className="text-white" />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="text-white">{crumb}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
