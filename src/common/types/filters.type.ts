export type Filters = {
    price: {
        from: number;
        to: number;
    };
    date: {
        from: string;
        to: string;
    };
};

export type ActiveFilters = {
    price: {
        from: number | null;
        to: number | null;
    } | null;
    date: {
        from: string | null;
        to: string | null;
    } | null;
    activeSearch: string | null;
};
