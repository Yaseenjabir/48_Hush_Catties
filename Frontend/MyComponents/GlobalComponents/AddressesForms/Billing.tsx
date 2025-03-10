"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@heroui/react";

import MyCustomBtn from "../MyCustomBtn";
import { playfairDisplay } from "@/app/my-account/Main/Heading";
import { Address } from "@/constants/constants";

const formSchema = z.object({
  street: z.string().min(5).max(100),
  city: z.string().min(3).max(50),
  state: z.string().min(2).max(50),
  postalCode: z.string().min(5).max(10),
  country: z.string().min(2).max(50),
});

export default function Billing({ data, type }) {
  const {
    shippingAddress,
    billingAddress,
  }: { shippingAddress: Address; billingAddress: Address } = data.addresses || {
    shippingAddress: {},
    billingAddress: {},
  };
  const address = type === "shipping" ? shippingAddress : billingAddress;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      country: address?.country || "",
    },
  });

  useEffect(() => {
    if (address) {
      form.reset({
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      });
    }
  }, [address, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full">
      <h1 className={`${playfairDisplay.className} font-bold border-b py-3`}>
        Billing Details
      </h1>
      <div className="flex flex-col w-full">
        <div className="w-full py-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button className="w-full hidden" type="button">
                <MyCustomBtn>Submit</MyCustomBtn>
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
