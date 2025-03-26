// store.ts
import { create } from "zustand";
import { Product } from "@/constants/constants";
import { globalData } from "./slices/productSlice";
import { itemSlice } from "./slices/cartSlice";

type State = {
  globalData: Product[];
  insertData: (val: Product[]) => void;
  items: any[];
  insertItems: (items: any[]) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (productId: string, newQuantity: number) => void;
};

const useStore = create<State>((set) => ({
  ...globalData(set),
  ...itemSlice(set),
}));

export default useStore;
