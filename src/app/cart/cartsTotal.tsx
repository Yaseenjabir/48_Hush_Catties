import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { playfairDisplay } from "../my-account/Main/Heading";
import { CREATE_PAYMENT, getCookie } from "@/constants/constants";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "../../../client/axiosClient";
import useStore from "@/store/store";
import { locations } from "@/lib/locations";

const formSchema = z.object({
  // name: z.string().min(2).max(50),
  // email: z.string().email(),
  line1: z.string().min(2).max(50),
  line2: z.string().min(2).max(50),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
});

export default function CartsTotal() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const { items } = useStore();

  const selectedCountryData = locations.find(
    (loc) => loc.value === selectedCountry
  );
  const selectedStateData = selectedCountryData?.states.find(
    (state) => state.value === selectedState
  );
  const selectedCityData = selectedStateData?.cities.find(
    (city) => city.value === selectedCity
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleCheckout = async () => {
    // Validate the form
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const shippingAddress = form.getValues();

    const token = getCookie("authToken");

    const products = items.map((item) => {
      return {
        _id: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,
        price: Number(item.productId.price),
        quantity: item.quantity,
        images: item.productId.imageUrls,
        color: item.color,
        size: item.size,
      };
    });

    try {
      const res = await apiClient.post(
        CREATE_PAYMENT,
        {
          products,
          deliveryCharges: selectedCityData?.charges,
          shippingAddress,
        },
        { headers: { Authorization: token } }
      );
      if (res.status === 200) {
        window.location.href = res.data.url;
      }
    } catch (ex) {
      toast.error("Something went wrong!!");
      console.log(ex);
    }
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedState(null);
    setSelectedCity(null);
    form.setValue("state", "");
    form.setValue("city", "");
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity(null);
    form.setValue("city", "");
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  return (
    <div className="w-full lg:w-[40%] sticky top-5 z-10 h-fit border p-5">
      <div className="border-b flex items-center mb-5 pb-5">
        <h1 className={`font-bold ${playfairDisplay.className} text-lg`}>
          Shipping Address
        </h1>
      </div>
      <Form {...form}>
        <form className="space-y-8">
          {/* 
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="line1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="line2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input placeholder="address" {...field} />
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
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCountryChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((country) => (
                        <SelectItem key={country.id} value={country.value}>
                          {country.countryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {selectedCountry && (
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleStateChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCountryData?.states.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.stateName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {selectedState && (
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCityChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedStateData?.cities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.cityName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
      <div className="w-full">
        <div className="border-b py-5 flex items-center">
          <h1 className={`font-bold ${playfairDisplay.className} text-lg`}>
            Cart Totals
          </h1>
        </div>
        <ul className="w-full text-sm py-5">
          <li className="border-b px-5 py-3 flex items-center justify-between">
            <span className="font-bold">Subtotal :</span>
            <span className="text-gray-700">
              €{" "}
              {items.reduce(
                (total, item) =>
                  total + item.quantity * Number(item.productId.price),
                0
              )}
            </span>
          </li>

          <li className="border-b px-5 py-3 flex items-center justify-between">
            <span className="font-bold">Delivery Charges :</span>
            <span className="text-gray-700">
              {selectedCityData?.charges
                ? `€ ${selectedCityData.charges}`
                : "Select location"}
            </span>
          </li>

          <li className="px-5 py-3 flex items-center justify-between border-b">
            <span className="font-bold">Total :</span>
            <span className="text-gray-700">
              €{" "}
              {items.reduce(
                (total, item) =>
                  total + item.quantity * Number(item.productId.price),
                0
              ) + (selectedCityData?.charges || 0)}
            </span>
          </li>
          <li className="px-5 py-3 flex items-center justify-between">
            <button
              onClick={handleCheckout}
              className="w-full bg-black p-3 text-white font-semibold hover:bg-transparent hover:text-black border border-black transition-all ease-in-out duration-300"
            >
              Checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
