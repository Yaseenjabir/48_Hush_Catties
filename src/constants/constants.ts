export const shopName = "Hush Catties";
export const shopLocation = "Pakistan";

// user
export const USER_SIGNUP_ROUTE = "/api/user/registerUser";
export const USER_LOGIN_ROUTE = "/api/user/loginUser";
export const GET_USER_PROFILE = "/api/user/getProfile";
export const UPDATE_USER_PROFILE = "/api/user/updateProfile";

// product
export const ADD_PRODUCT_ROUTE = "/api/product/addProduct";
export const GET_ALL_PRODUCTS = "/api/product/getAllProducts";
export const GET_SINGLE_PRODUCT = "/api/product/getSingleProduct/:id";

//cart
export const ADD_ITEM_TO_CART = "/api/cart/addItemToCart";
export const FETCH_CART_ITEMS = "/api/cart/getCartItems";
export const DELETE_CART_ITEMS = "/api/cart/deleteItem";
export const CHANGE_QUANTITY = "/api/cart/changeQuantity";
export const REMOVE_FROM_CART = "/api/cart/deleteItem?productId=";

// address
export const CREATE_ADDRESS = "/api/address/createAddress";

export const categories = [
  "Dress",
  "Abaya",
  "Coords",
  "Tops",
  "Jacket",
  "Coat",
  "Kimanos",
  "Cardigans",
];

export const sizes = ["S", "M", "L", "XL", "XXL"];

export const colorMapping = [
  { name: "Red", code: "#FF0000" },
  { name: "Blue", code: "#0000FF" },
  { name: "Green", code: "#008000" },
  { name: "Black", code: "#000000" },
  { name: "White", code: "#FFFFF" },
  { name: "Pink", code: "#FFC0CB" },
  { name: "Yellow", code: "#FFFF00" },
];

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Review {
  _id: string;
  product: string;
  user: User;
  title: string;
  comment: string;
  rating: number;
  likes: number;
  dislikes: number;
  isApproved: boolean;
  createdAt: Date;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  size: string;
  color: string;
  imageUrls: string[];
  stock: boolean;
  reviews: Review[];
  createdAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length > 1) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

export function setCookie(name: string, value: string, days: number = 1) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=None`;
}
