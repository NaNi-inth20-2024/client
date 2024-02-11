import { Bid } from "./bid.type";

type Auction = {
    id: number;
    title: string;
    description: string;
    initial_price: number;
    min_bid_price_gap: number;
    images: Array<{ id: number; photo: string; auction: number }>;
    author: { id: number; username: string; email: string };
    started: boolean;
    finished: boolean;
    start_time: string;
    end_time: string;
    active: boolean;
    leader_bid: Bid;
};

type CreateAuctionDto = {
    title: string;
    description: string;
    initial_price: number;
    min_bid_price_gap: number;
    start_time: string;
    end_time: string;
    active: boolean;
};

export type { Auction, CreateAuctionDto };
