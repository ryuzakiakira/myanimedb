import { createSlice } from "@reduxjs/toolkit";

const prevList = JSON.parse(localStorage.getItem("mangaList"));

let initialState = {
    list: []
}

if (prevList) {
    initialState.list = prevList;
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
            localStorage.setItem("mangaList", JSON.stringify(state.list));
        },
        removeFromMangaList: (state, action) => {
            state.list = state.list.filter((manga) => manga.id !== action.payload.id);
            localStorage.setItem("mangaList", JSON.stringify(state.list));
        },
    },
});

export const { addToMangaList, removeFromMangaList } = mangaListSlice.actions;

export default mangaListSlice.reducer;