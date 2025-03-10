// itemSlice.ts
export const itemSlice = (set: any) => ({
  items: [],

  insertItems: (newItems: any[]) =>
    set(() => ({
      items: newItems, // Directly set the items array to the new data
    })),

  // Remove an item based on a condition (e.g., item id)
  removeItem: (itemId: string) =>
    set((state: any) => ({
      items: state.items.filter((product: any) => {
        // console.log("productId : ", product._id);
        // console.log("itemId : ", itemId);
        return product.productId._id !== itemId;
      }),
    })),
  updateItemQuantity: (productId: string, newQuantity: number) =>
    set((state: any) => ({
      items: state.items.map((item: any) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ),
    })),
});
