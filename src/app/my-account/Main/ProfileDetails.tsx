"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input, Spinner } from "@heroui/react";
import Heading from "./Heading";
import { getCookie, UPDATE_USER_PROFILE, User } from "@/constants/constants";
import { apiClient } from "../../../../client/axiosClient";
import { toast } from "sonner";

const formSchema = z.object({
  // username: z.string().min(4).max(50),
  firstName: z.string().min(4).max(50),
  lastName: z.string().min(4).max(50),
  email: z.string().email("Please write a valid email"),
  // password: z.string().min(6).max(50),
});

export default function ProfileDetails({ data }) {
  const user: User = data.user;
  const [loader, setLoader] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoader(true);
    const authToken = getCookie("authToken");
    try {
      const res = await apiClient.patch(UPDATE_USER_PROFILE, values, {
        headers: { Authorization: authToken },
      });
      if (res.status === 200) {
        toast.success("Your profile has been updated successfully");
        setInterval(() => location.reload(), 2000);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  }

  return (
    <section className="w-full py-10 px-5">
      <Heading text="Account Details" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex items-center justify-center gap-5 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="w-full"
                      label="First Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="w-full"
                      label="First Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="w-full"
                    label="Username"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {" "}
                  This will be how your name will be displayed in the account
                  section and in reviews{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="w-full"
                    label="Email address"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="w-full"
                    label="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {loader ? (
            <Button
              className="py-2 rounded-full bg-red-700 text-white font-semibold border border-red-700 hover:bg-transparent hover:text-red-700 transition-all ease-in-out duration-300"
              type="submit"
            >
              Saving <Spinner size="sm" color="secondary" />
            </Button>
          ) : (
            <Button
              className="py-2 rounded-full bg-red-700 text-white font-semibold border border-red-700 hover:bg-transparent hover:text-red-700 transition-all ease-in-out duration-300"
              type="submit"
            >
              Save Changes
            </Button>
          )}
        </form>
      </Form>
    </section>
  );
}
