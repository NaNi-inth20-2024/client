import { FC } from "react";
import Input from "../common/input/input";

import { useState } from "react";

import styles from "./styles.module.scss";
import FiltersSection from "./components/filters/filters-section";
import { ActiveFilters, Auction, Filters } from "../../common/types/types";
import Button from "../common/button/button";
import Auctions from "./components/auctions/auctions";

const AuctionsPage: FC = () => {
    const [filters, setFilters] = useState<Filters>({
        price: {
            from: 0,
            to: 0,
        },
        date: {
            from: "",
            to: "",
        },
    });

    const [auctions] = useState<Auction[]>([
        {
            id: "1",
            name: "Auction 1",
            price: 100,
            date: "2021-01-01",
            img: "https://via.placeholder.com/200",
            description: "Description 1",
        },
        {
            id: "2",
            name: "Auction 2",
            price: 100,
            date: "2021-01-01",
            img: "https://via.placeholder.com/200",
            description: "Description 1",
        },
    ]);

    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        price: null,
        date: null,
        activeSearch: null,
    });

    return (
        <div className={styles.auctionsPage}>
            <FiltersSection filters={filters} setFilters={setFilters} />
            <div className={styles.auctionsContainer}>
                <div className={styles.auctionsContainer__tools}>
                    <Input
                        className={styles.searchInput}
                        name="search"
                        type="search"
                        placeholder="Search"
                        icon="search"
                    />
                    <Button name="+ Create new auction" />
                </div>
                <Auctions auctions={auctions} />
            </div>
        </div>
    );
};

export default AuctionsPage;
