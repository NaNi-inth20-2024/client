import { createSlice } from "@reduxjs/toolkit/react";

export const bidSlice = createSlice({
    name: "bid",
    initialState: {
        bids: [],
    },
    reducers: {
        addBid(state, action) {
            state.bids.push(action.payload);
        },
        replaceBids(state, action) {
            state.bids = action.payload;
        },
        clearBids(state) {
            state.bids = [];
        }
    },
});

export const { addBid, replaceBids, clearBids } = bidSlice.actions;