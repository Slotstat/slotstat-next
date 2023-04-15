import { create } from "zustand";

const useStore = create((set, get) => ({
  test: "",
}));

export default useStore;
