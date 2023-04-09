import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const updateWidthState = create(
  devtools((set) => ({
    width: false,
    setWidth: () => set((state) => ({ width: !state.width })),
  }))
);

export const userInfoStore = create(
  devtools((set) => ({
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    userSignIn: (object) => set({ userInfo: object }),
    userSignOut: () => set({ userInfo: null }),
  }))
);
