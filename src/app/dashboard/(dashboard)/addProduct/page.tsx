"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { MultiSelect } from "./multi-select";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { apiClient } from "../../../../../client/axiosClient";
import { FaArrowRotateRight } from "react-icons/fa6";
import { ADD_PRODUCT_ROUTE } from "@/constants/constants";

const colors = [
  "Red",
  "Blue",
  "Green",
  "Black",
  "White",
  "Pink",
  "Yellow",
] as const;
const sizes = ["S", "M", "L", "XL", "XXL"] as const;
const categories = [
  "Dress",
  "Abaya",
  "Coords",
  "Tops",
  "Jacket",
  "Coat",
  "Kimanos",
  "Cardigans",
] as const;

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  category: z.enum(categories),
  size: z.array(z.enum(sizes)).min(1),
  color: z.array(z.enum(colors)).min(1),
  stock: z.boolean(),
  // tiktokUrl: z.string().optional(),
  images: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Each file must be an image.",
      })
    )
    .min(1),
});

export default function Page() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);

      const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".heic",
        ".heif",
        ".webp",
      ];

      const invalidFiles = fileArray.filter((file) => {
        const fileExtension = file.name
          .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
          .toLowerCase();
        return !allowedExtensions.includes(`.${fileExtension}`);
      });

      if (invalidFiles.length > 0) {
        alert(
          "Please select only valid image files (jpg, jpeg, png, heic, heif, webp)."
        );
        event.target.value = "";
      } else {
        form.setValue("images", fileArray);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("price", values.price);

    formData.append("stock", String(values.stock));

    // if (values.tiktokUrl) {
    //   formData.append("tiktokUrl", values.tiktokUrl);
    // }

    values.images.forEach((image) => {
      formData.append("images", image);
    });
    values.color.forEach((color) => formData.append("color", color));
    values.size.forEach((size) => formData.append("size", size));

    try {
      setLoading(true);
      const res = await apiClient.post(ADD_PRODUCT_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        toast.success("Your post has been created successfully");
        setTimeout(() => location.reload(), 2000);
      }
    } catch (error) {
      toast.success("An unexpected error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={colors.map((color) => ({
                      value: color,
                      label: color,
                    }))}
                    onValueChange={(selectedValues) => {
                      field.onChange(selectedValues); // Update the form value
                    }}
                    placeholder="Select colors"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={sizes.map((color) => ({
                      value: color,
                      label: color,
                    }))}
                    onValueChange={(selectedValues) => {
                      field.onChange(selectedValues); // Update the form value
                    }}
                    placeholder="Select sizes"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    {...field}
                    placeholder="Type your product description here."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>In Stock</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? "true" : "false"}
                    onValueChange={(selectedValue) => {
                      form.setValue("stock", selectedValue === "true");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Stock Value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">In Stock</SelectItem>
                      <SelectItem value="false">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(
                      selectedValue: (typeof categories)[number]
                    ) => {
                      form.setValue("category", selectedValue);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter price" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="tiktokUrl"
            render={() => (
              <FormItem>
                <FormLabel>Tiktok Url (Optional)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter url" />
                </FormControl>
                <FormDescription>A url to the tiktok video</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {loading ? (
            <Button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700">
              Submitting <FaArrowRotateRight className="animate-spin" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Submit
            </Button>
          )}
        </form>
      </Form>
    </section>
  );
}
