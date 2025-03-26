// app/dashboard/(dashboard)/layout.tsx
import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { Navigation } from "@toolpad/core";
import { TimelineOutlined } from "@mui/icons-material";
import { IoIosAdd } from "react-icons/io";
import { LayoutDashboardIcon } from "lucide-react";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    segment: "dashboard/orders",
    title: "Orders",
    icon: <TimelineOutlined />,
  },
  {
    segment: "dashboard/addProduct",
    title: "Add Product",
    icon: <IoIosAdd className="text-2xl" />,
  },
];

const BRANDING = {
  title: "Hush Catties",
};

export default function DashboardPagesLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <NextAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <DashboardLayout>
        <PageContainer>{props.children}</PageContainer>
      </DashboardLayout>
    </NextAppProvider>
  );
}
