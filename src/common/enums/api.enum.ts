const API = {
    URL: import.meta.env.VITE_API_URL as string,
} as const;

const API_ROUTES = {
    AUCTIONS: "/auctions",
    AUCTION_PHOTOS: "/auction-photos",
    AUTH: "/auth",
    BIDS: "/bids",
} as const;

const AUCTIONS_ROUTES = {
    ACTIVATE: "/activate",
    BIDS: "/bids",
    DEACTIVATE: "/deactivate",
    WINNER: "/winner",
} as const;

const AUTH_ROUTES = {
    REGISTER: "/register",
    TOKEN: "/token/",
} as const;

const AUTH_TOKEN_ROUTES = {
    REFRESH: "/refresh",
};

export { API, API_ROUTES, AUCTIONS_ROUTES, AUTH_ROUTES, AUTH_TOKEN_ROUTES };
