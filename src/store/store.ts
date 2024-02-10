import { configureStore } from "@reduxjs/toolkit";
import { auctionsApi } from "./auctions.api";

const store = configureStore({
    reducer: {
        [auctionsApi.reducerPath]: auctionsApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(auctionsApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { type RootState, type AppDispatch, store };
