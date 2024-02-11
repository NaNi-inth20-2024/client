import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Auction } from "@/common/types/types";
import { API, API_ROUTES } from "@/common/enums/enums";

const auctionsApi = createApi({
    reducerPath: "auctionsApi",
    baseQuery: fetchBaseQuery({ baseUrl: API.URL }),
    endpoints: (builder) => ({
        getAuctions: builder.query<Auction[], string>({
            query: (filters: string) => `${API_ROUTES.AUCTIONS}/${filters}`,
            transformResponse: (rawResult: { results: Auction[] }) => {
                const { results } = rawResult;

                return results;
            },
        }),
        getAuctionById: builder.query<Auction, number>({
            query: (id: number) => `/${id}`,
        }),
    }),
});

const { useGetAuctionsQuery, useGetAuctionByIdQuery } = auctionsApi;

export { auctionsApi, useGetAuctionsQuery, useGetAuctionByIdQuery };
