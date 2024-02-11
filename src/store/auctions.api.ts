import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Auction, CreateAuctionDto } from "@/common/types/auction.type";
import { API, API_ROUTES } from "@/common/enums/enums";

const auctionsApi = createApi({
    reducerPath: "auctionsApi",
    baseQuery: fetchBaseQuery({ baseUrl: API.URL }),
    endpoints: (builder) => ({
        getAuctions: builder.query<Auction[], string>({
            query: (filters: string) => `${API_ROUTES.AUCTIONS}/${filters}`,
            transformResponse: (rawResult: { results: Auction[] }, meta) => {
                const { results } = rawResult;
                console.log(rawResult, meta);

                return results;
            },
        }),
        getAuctionById: builder.query<Auction, number>({
            query: (id: number) => `/${id}`,
        }),
        createAuction: builder.mutation<Auction, CreateAuctionDto>({
            query: (body: CreateAuctionDto) => ({
                url: `${API_ROUTES.AUCTIONS}`,
                method: "post", // HTTP_METHODS.POST,
                body,
            }),
            transformResponse: (results: Auction, meta) => {
                console.log(results, meta);

                return results;
            },
        }),
    }),
});

const {
    useGetAuctionsQuery,
    useGetAuctionByIdQuery,
    useCreateAuctionMutation,
} = auctionsApi;

export {
    auctionsApi,
    useGetAuctionsQuery,
    useGetAuctionByIdQuery,
    useCreateAuctionMutation,
};
