import { createSlice } from "@reduxjs/toolkit/react";
const maxBids = 15;
export const bidSlice = createSlice({
    name: "bid",
    initialState: {
        bids: [],
    },
    reducers: {
        addBid(state, action) {
            if (state.bids.length >= maxBids) {
                state.bids.pop();
            }
            state.bids.unshift(action.payload);
        },
        replaceBids(state, action) {
            state.bids = action.payload;
        },
        clearBids(state) {
            state.bids = [];
        },
    },
});

export const { addBid, replaceBids, clearBids } = bidSlice.actions;
