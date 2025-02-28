"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@heroui/react";
import Heading from "./Heading";

const formSchema = z.object({
  username: z.string().min(4).max(50),
  firstName: z.string().min(4).max(50),
  lastName: z.string().min(4).max(50),
  email: z.string().email("Please write a valid email"),
  password: z.string().min(6).max(50),
});

export default function ProfileDetails() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
          <FormField
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
          />
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
          <FormField
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
          />
          <Button
            className="py-2 rounded-full bg-red-700 text-white font-semibold border border-red-700 hover:bg-transparent hover:text-red-700 transition-all ease-in-out duration-300"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </section>
  );
}
