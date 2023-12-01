import { createSlice } from "@reduxjs/toolkit";

const prevList = JSON.parse(localStorage.getItem("animeList"));

let initialState = {
    list: []
}

if (prevList) {
    initialState.list = prevList;
}

export const animeListSlice = createSlice({
    name: "animeList",
    initialState,
    reducers: {
        addToList: (state, action) => {
            const listItem = {
                id: action.payload.id,
                title: action.payload.title,
                type: action.payload.type,
                img: action.payload.img
            }
            state.list.push(listItem);
            localStorage.setItem("animeList", JSON.stringify(state.list));
        },
        removeFromList: (state, action) => {
            state.list = state.list.filter((anime) => anime.id !== action.payload.id);
            localStorage.setItem("animeList", JSON.stringify(state.list));
        },
    },
});

export const { addToList, removeFromList } = animeListSlice.actions;

export default animeListSlice.reducer;
