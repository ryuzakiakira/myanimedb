import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: []
}

export const mangaListSlice = createSlice({
    name: "mangaList",
    initialState,
    reducers: {
        addToMangaList: (state, action) => {
            const listItem = {
                id: action.payload.id,
                title: action.payload.title,
                type: action.payload.type,
                img: action.payload.img
            }
            state.list.push(listItem);
        },
        removeFromMangaList: (state, action) => {
            state.list = state.list.filter((manga) => manga.id !== action.payload.id);
        },
    },
});

export const { addToMangaList, removeFromMangaList } = mangaListSlice.actions;

export default mangaListSlice.reducer;