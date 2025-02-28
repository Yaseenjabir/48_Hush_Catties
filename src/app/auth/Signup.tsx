import { Input } from "@/components/ui/input";
import React from "react";
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

const formSchema = z.object({
  firstName: z.string().min(4).max(50),
  lastName: z.string().min(4).max(50),
  username: z.string().min(4).max(50),
  email: z.string().email("Please write a valid email"),
  password: z.string().min(6).max(50),
});

export default function Signup({ setShowLogin }: { setShowLogin: any }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="w-full min-h-screen py-10 px-5 flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full flex flex-col bg-white shadow-md md:flex-row max-w-[1000px] mx-auto">
        <div className="py-7 px-5 w-full">
          <span className="text-2xl text-gray-800">Sign Up</span>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-10"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-extrabold text-[12px]">
                      USERNAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="focus:outline-none rounded-full bg-gray-100 focus:bg-gray-200 placeholder:text-sm"
                        placeholder="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-extrabold text-[12px]">
                      EMAIL
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="focus:outline-none rounded-full bg-gray-100 focus:bg-gray-200 placeholder:text-sm"
                        placeholder="Email"
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
                  <FormItem>
                    <FormLabel className="font-extrabold text-[12px]">
                      PASSWORD
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="focus:outline-none rounded-full bg-gray-100 focus:bg-gray-200 placeholder:text-sm"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full py-2 rounded-full bg-red-700 text-white font-semibold border border-red-700 hover:bg-transparent hover:text-red-700 transition-all ease-in-out duration-300"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-full h-[390px] md:h-auto bg-red-700 text-white flex flex-col items-center justify-center text-center p-5 gap-3">
          <h1 className="font-extrabold text-3xl">Welcome to signup page</h1>

          <p className="font-semibold">Already having account?</p>

          <button
            onClick={() => setShowLogin((prev: any) => !prev)}
            className="border border-white rounded-full py-2 px-8 hover:bg-white hover:text-red-700 transition-all ease-in-out duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}
