import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Auction, CreateAuctionDto } from "@/common/types/auction.type";
import {
    API,
    API_ROUTES,
    HTTP_METHODS,
    TOKEN_NAME,
} from "@/common/enums/enums";
import { localStorageService } from "@/services/services";

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
            query: (id: number) => `${API_ROUTES.AUCTIONS}/${id}`,
        }),
        createAuction: builder.mutation<Auction, CreateAuctionDto>({
            query: (body: CreateAuctionDto) => ({
                url: `${API_ROUTES.AUCTIONS}/`,
                method: HTTP_METHODS.POST,
                body,
                headers: {
                    Authorization: `Bearer ${localStorageService.getByKey(TOKEN_NAME.ACCESS)}`,
                },
            }),
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
