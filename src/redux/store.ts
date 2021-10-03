import { configureStore } from "@reduxjs/toolkit";
import simulation from "./slice/simulationSlice";

export const store = configureStore({
  reducer: {
    simulation,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
