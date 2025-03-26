//productSlice.ts
export const globalData = (set: any) => ({
  globalData: [],
  insertData: (newData: any) =>
    set((state: any) => {
      // Convert the current globalData into a Set of stringified objects to ensure uniqueness
      const existingDataSet = new Set(
        state.globalData.map((item: any) => JSON.stringify(item))
      );

      // Add new data to the Set, stringified
      newData.forEach((newItem: any) =>
        existingDataSet.add(JSON.stringify(newItem))
      );

      // Convert the Set back into an array of objects
      const updatedData = Array.from(existingDataSet).map((item: any) =>
        JSON.parse(item)
      );

      return {
        globalData: updatedData,
      };
    }),
});
