import type { Selection } from "@heroui/react";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";

const rows = [
  {
    key: "1",
    productName: "Product A",
    unitPrice: "$25.99",
    dateAdded: "2025-01-10",
    stockStatus: "In Stock",
  },
  {
    key: "2",
    productName: "Product B",
    unitPrice: "$14.99",
    dateAdded: "2025-02-15",
    stockStatus: "Out of Stock",
  },
  {
    key: "3",
    productName: "Product C",
    unitPrice: "$8.99",
    dateAdded: "2025-02-20",
    stockStatus: "In Stock",
  },
  {
    key: "4",
    productName: "Product D",
    unitPrice: "$19.99",
    dateAdded: "2025-03-01",
    stockStatus: "Limited Stock",
  },
];

const columns = [
  {
    key: "productName",
    label: "PRODUCT NAME",
  },
  {
    key: "unitPrice",
    label: "UNIT PRICE",
  },
  {
    key: "dateAdded",
    label: "DATE ADDED",
  },
  {
    key: "stockStatus",
    label: "STOCK STATUS",
  },
];

export default function TableComp() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["2"])
  );

  return (
    <Table
      aria-label="Controlled table example with dynamic content"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => {
              // Render the cell value based on the columnKey
              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
