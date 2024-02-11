import { configureStore } from "@reduxjs/toolkit";
import { auctionsApi } from "./auctions.api";
import { bidSlice } from "./bid/bid.slice";

const store = configureStore({
    reducer: {
        [auctionsApi.reducerPath]: auctionsApi.reducer,
        [bidSlice.name]: bidSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(auctionsApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { type RootState, type AppDispatch, store };
