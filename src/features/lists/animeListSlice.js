import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // will implement multiple lists later...
    // watching: [{id: 1, anime: "Dragon Ball Z", type: "TV"}],
    // planing: [{id: 1, anime: "Dragon Ball", type: "TV"}],
    // completed: [{id: 1, anime: "Dragon Ball Super", type: "TV"}]

    list: [{id: 1, anime: "Dragon Ball Z", type: "TV"}]
}

export const animeListSlice = createSlice({
    name: "animeList",
    initialState,
    reducers: {
        addToList: (state, action) => {
            const listItem = {
                id: action.payload.id,
                anime: action.payload.title,
                type: action.payload.type
            }
            state.list.push(listItem);
        },
        removeFromList: (state, action) => {
            state.list = state.list.filter((anime) => anime.id !== action.payload.id);
        },
    },
});

export const { addToList, removeFromList } = animeListSlice.actions;

export default animeListSlice.reducer;
