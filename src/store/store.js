import { configureStore } from "@reduxjs/toolkit";
import animeListReducer from "../features/lists/animeListSlice";

export const store = configureStore({
    reducer: animeListReducer,
});