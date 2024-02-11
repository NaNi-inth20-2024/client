import { createSlice } from "@reduxjs/toolkit/react";
const maxBids = 15;
export const bidSlice = createSlice({
    name: "bid",
    initialState: {
        bids: [],
        topBids: [],
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

        addTopBid(state, action) {
            // find user in topBids, if exists, replace, if not, add
            const user = action.payload.author;
            const index = state.topBids.findIndex((bid) => bid.author.id === user.id);
            if (index !== -1) {
                state.topBids[index] = action.payload;
            } else {
                state.topBids.push(action.payload);
            }

            // sort topBids
            state.topBids.sort((a, b) => b.price - a.price);
        },

        replaceTopBids(state, action) {
            state.topBids = action.payload;
            state.topBids.sort((a, b) => b.price - a.price);
        },

        clearTopBids(state) {
            state.topBids = [];
        },
    },
});

export const { addBid, replaceBids, clearBids, addTopBid, replaceTopBids, clearTopBids } = bidSlice.actions;
