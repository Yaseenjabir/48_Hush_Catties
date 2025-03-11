import React, { useRef, useState, useEffect } from "react";
import Heading from "./Heading";
import { Playfair_Display } from "next/font/google";
import { Address, CREATE_ADDRESS, getCookie } from "@/constants/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { apiClient } from "../../../../client/axiosClient";

const playfairDisplay = Playfair_Display({
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const formSchema = z.object({
  street: z.string().min(5).max(100),
  city: z.string().min(3).max(50),
  state: z.string().min(2).max(50),
  postalCode: z.string().min(5).max(10),
  country: z.string().min(2).max(50),
});

export default function Addresses({ data }) {
  const { shippingAddress = {}, billingAddress = {} } = data.addresses || {};

  const dialogRef = useRef<HTMLButtonElement>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [addressType, setAddressType] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: selectedAddress?.street || "",
      city: selectedAddress?.city || "",
      state: selectedAddress?.state || "",
      postalCode: selectedAddress?.postalCode || "",
      country: selectedAddress?.country || "",
    },
  });

  // Reset the form when selectedAddress changes
  useEffect(() => {
    if (selectedAddress) {
      form.reset({
        street: selectedAddress.street,
        city: selectedAddress.city,
        state: selectedAddress.state,
        postalCode: selectedAddress.postalCode,
        country: selectedAddress.country,
      });
    }
  }, [selectedAddress, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = getCookie("authToken");
    try {
      const res = await apiClient.post(
        CREATE_ADDRESS,
        { ...values, addressType },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
      if (res.status === 201) {
        toast.success("Your address has been addedd succesfully");
        setInterval(() => location.reload(), 2000);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Somthing went wrong");
    }
  }

  return (
    <section className="w-full py-10 px-5">
      <Heading text="Addresses" />
      <p className="text-sm md:text-base">
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="w-full flex flex-col items-center justify-center gap-10 mt-5 lg:flex-row">
        <div className="w-full border">
          <div className="w-full bg-[#f1f1f173] p-5 border-b-[2px]">
            <h1
              className={`${playfairDisplay.className} text-2xl font-bold mb-10`}
            >
              Billing Address
            </h1>
            <p
              onClick={() => {
                setAddressType("billing");
                setSelectedAddress(billingAddress);
                dialogRef.current?.click();
              }}
              className="text-end cursor-pointer w-full text-sm hover:underline"
            >
              Edit Billing Address
            </p>
          </div>
          <div className="p-5 italic text-gray-600 text-sm">
            {Object.keys(billingAddress).length > 0 ? (
              <ul className="flex flex-col gap-2">
                <li>{`${data.user.firstName} ${data.user.lastName}`}</li>
                <li>{billingAddress.street}</li>
                <li>{billingAddress.city}</li>
                <li>{billingAddress.postalCode}</li>
                <li>{billingAddress.state}</li>
                <li>{billingAddress.country}</li>
              </ul>
            ) : (
              <li>No address added yet</li>
            )}
          </div>
        </div>
        <div className="w-full border">
          <div className="w-full bg-[#f1f1f173] p-5 border-b-[2px]">
            <h1
              className={`${playfairDisplay.className} text-2xl font-bold mb-10`}
            >
              Shipping Address
            </h1>
            <p
              onClick={() => {
                setAddressType("shipping");
                setSelectedAddress(billingAddress);
                dialogRef.current?.click();
              }}
              className="text-end cursor-pointer w-full text-sm hover:underline"
            >
              Edit Shipping Address
            </p>
          </div>
          <div className="p-5 italic text-gray-600 text-sm">
            {Object.keys(shippingAddress).length > 0 ? (
              <ul className="flex flex-col gap-2">
                <li>{`${data.user.firstName} ${data.user.lastName}`}</li>
                <li>{shippingAddress.street}</li>
                <li>{shippingAddress.city}</li>
                <li>{shippingAddress.postalCode}</li>
                <li>{shippingAddress.state}</li>
                <li>{shippingAddress.country}</li>
              </ul>
            ) : (
              <li>No address added yet</li>
            )}
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger className="invisible" ref={dialogRef}>
          Open
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <Form {...form}>
                <h1
                  className={`text-start mb-5 text-2xl text-gray-700 font-bold ${playfairDisplay.className}`}
                >
                  {addressType === "shipping"
                    ? "Shipping Address"
                    : "Billing Address"}
                </h1>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="pl-1">Street</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-sm"
                            placeholder="Street"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="pl-1">City</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-sm"
                            placeholder="City"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="pl-1">State</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-sm"
                            placeholder="State"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="pl-1">Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-sm"
                            placeholder="Postal Code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="pl-1">Country</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:text-sm"
                            placeholder="Country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
