type Bid = {
    id: number;
    price: number;
    author: {
        id: number;
        username: string;
        email: string;
    };
    won: boolean;
    created: string;
    leader: boolean;
};
export { type Bid };
