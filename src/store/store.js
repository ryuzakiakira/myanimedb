import { configureStore } from "@reduxjs/toolkit";
import animeListReducer from "../features/lists/animeListSlice";
import mangaListReducer from "../features/lists/mangaListSlice";

export const store = configureStore({
    reducer: {
        animeList: animeListReducer,
        mangaList: mangaListReducer
    },
});