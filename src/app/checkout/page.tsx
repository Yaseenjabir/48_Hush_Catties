"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../MyComponents/GlobalComponents/BreadCrumb";
import Billing from "../../../MyComponents/GlobalComponents/AddressesForms/Billing";
import { Checkbox } from "@heroui/react";
import { playfairDisplay } from "../my-account/Main/Heading";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GET_USER_PROFILE, getCookie } from "@/constants/constants";
import { apiClient } from "../../../client/axiosClient";

const formSchema = z.object({
  cardNumber: z
    .string()
    .length(16, "Card number must be exactly 16 digits")
    .regex(/^\d+$/, "Card number must contain only numbers"),
  expiration: z
    .string()
    .regex(
      /^\d{2} \/ \d{4}$/,
      "Expiration date must be in the format MM / YYYY"
    )
    .refine((value) => {
      const [month, year] = value.split(" / ");
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      // Validate month (1-12) and year (current or future)
      if (yearNum < currentYear) return false; // Year is in the past
      if (yearNum === currentYear && monthNum < currentMonth) return false; // Month is in the past
      return true;
    }, "Expiration date must be in the future"),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV must be at most 4 digits")
    .regex(/^\d+$/, "CVV must contain only numbers"),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets"),
});

export default function Page() {
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState([]);
  // console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("authToken");
      try {
        const res = await apiClient.get(GET_USER_PROFILE, {
          headers: { Authorization: token },
        });
        console.log(res.data);
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiration: "",
      cvv: "",
      name: "",
    },
  });

  // Format expiration date as the user types
  const formatExpiration = (value: string) => {
    const digits = value.replace(/\D/g, ""); // Remove non-digits
    if (digits.length > 6) return value.slice(0, 7); // Prevent exceeding the format length

    let formattedValue = "";
    if (digits.length > 2) {
      formattedValue = `${digits.slice(0, 2)} / ${digits.slice(2, 6)}`;
    } else {
      formattedValue = digits;
    }
    return formattedValue;
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <BreadCrumb crumb="checkout" title="Checkout" />
      <section className="w-full flex flex-col gap-10 py-10 px-5 lg:flex-row max-w-[1100px] mx-auto">
        <div className="w-full">
          <Billing data={data} type={"billing"} />
          <div className="flex items-center">
            <Checkbox
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
              id="forShipping"
            />
            <label htmlFor="forShipping">
              Keep shipping address as billing address
            </label>
          </div>
          {!isChecked && <Billing data={data} type={"shipping"} />}
        </div>
        <div className="w-full lg:sticky top-5 h-fit">
          <h1
            className={`${playfairDisplay.className} text-lg font-bold border-b py-3`}
          >
            Payment
          </h1>
          <p className="text-sm py-5">
            All transactions are secure and encrypted.
          </p>
          <div className="w-full">
            <div className="p-3 flex items-center justify-between border">
              <span className="font-bold">Credit card</span>
              <div className="flex items-center gap-2">
                <Image
                  width={40}
                  height={40}
                  alt="svg"
                  src={
                    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/visa.sxIq5Dot.svg"
                  }
                />
                <Image
                  width={40}
                  height={40}
                  alt="svg"
                  src={
                    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/mastercard.1c4_lyMp.svg"
                  }
                />
                <Image
                  width={40}
                  height={40}
                  alt="svg"
                  src={
                    "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/amex.Csr7hRoy.svg"
                  }
                />
              </div>
            </div>
            <div className="bg-[#fafafacc] p-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Card Number Field */}
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-sm"
                            placeholder="Card Number"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
                              field.onChange(value.slice(0, 16)); // Limit to 16 digits
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Expiration Date Field */}
                  <FormField
                    control={form.control}
                    name="expiration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiration Date</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-sm"
                            placeholder="MM / YYYY"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              const formattedValue = formatExpiration(value);
                              field.onChange(formattedValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* CVV Field */}
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-sm"
                            placeholder="CVV"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
                              field.onChange(value.slice(0, 4)); // Limit to 4 digits
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Name on Card Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-sm"
                            placeholder="Name"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^A-Za-z\s]/g,
                                ""
                              ); // Allow only alphabets and spaces
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
