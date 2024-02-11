import { FC } from "react";
import Input from "../common/input/input";
import { useState } from "react";
import FiltersSection from "./components/filters/filters-section";
import { CreateAuctionDto, Filters } from "../../common/types/types";
import Button from "../common/button/button";
import Auctions from "./components/auctions/auctions";
import {
    useCreateAuctionMutation,
    useGetAuctionsQuery,
} from "@/store/auctions.api";

import styles from "./styles.module.scss";
import { getJoinedQueryParams } from "@/common/utils/requests.utils";
import Modal from "../common/modal/modal";
import { getInputDataChangeHandler } from "@/common/utils/forms.utils";

const mapAuctionsFiltersToQueryNames: (
    filter: Filters,
) => Record<string, string | number | null> = (filter: Filters) => {
    const filtersNamesToQueryNames: Record<keyof Filters, string> = {
        priceFrom: "initial_price__gt",
        priceTo: "initial_price__lt",
        dateFrom: "end_time__gt",
        dateTo: "end_time__lt",
        search: "search",
    };

    return Object.fromEntries(
        Object.entries(filter).map(([name, value]) => [
            filtersNamesToQueryNames[name as keyof Filters],
            value,
        ]),
    );
};

const AuctionsPage: FC = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [newAuctionData, setNewAuctionData] = useState<CreateAuctionDto>({
        title: "",
        description: "",
        initial_price: 0,
        min_bid_price_gap: 0,
        start_time: "",
        end_time: "",
        active: false,
    });

    const [compiledFilters, setCompiledFilters] = useState<string>("");
    const { data: auctions } = useGetAuctionsQuery(compiledFilters);

    const [activeFilters, setActiveFilters] = useState<Filters>({
        priceFrom: null,
        priceTo: null,
        dateFrom: null,
        dateTo: null,
        search: null,
    });

    const [createAuction] = useCreateAuctionMutation();

    const handleFiltersApplication = () => {
        setCompiledFilters(
            getJoinedQueryParams(mapAuctionsFiltersToQueryNames(activeFilters)),
        );
    };

    const newAuctionDataHandler =
        getInputDataChangeHandler<CreateAuctionDto>(setNewAuctionData);
    const handleAuctionCreation = () => {
        const isValidBody = Object.entries(newAuctionData)
            .filter(([name, value]) => name !== "active")
            .every(([name, value]) => Boolean(value));

        if (!isValidBody) {
            alert("Invalid auction body");
            return;
        }

        createAuction(newAuctionData);
        setIsCreateModalOpen(false);
    };

    return (
        <>
            <div className={styles.auctionsPage}>
                <FiltersSection
                    filters={activeFilters}
                    setFilters={setActiveFilters}
                    onApplyFilters={handleFiltersApplication}
                />
                <div className={styles.auctionsContainer}>
                    <div className={styles.auctionsContainer__tools}>
                        <Input
                            className={styles.searchInput}
                            name="search"
                            type="search"
                            placeholder="Search"
                            icon="search"
                        />
                        <Button
                            name="+ New auction"
                            onClick={() => setIsCreateModalOpen(true)}
                        />
                    </div>
                    <FiltersSection
                        filters={activeFilters}
                        setFilters={setActiveFilters}
                        onApplyFilters={handleFiltersApplication}
                        device="mobile"
                    />
                    <Auctions auctions={auctions || []} />
                </div>
            </div>
            <Modal
                visible={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            >
                <div className={styles.createModal}>
                    <label>
                        <span>Lot name</span>
                        <Input
                            name="product-name"
                            type="text"
                            onChange={newAuctionDataHandler("title")}
                        />
                    </label>
                    <label>
                        <span>Lot description</span>
                        <Input
                            name="product-description"
                            type="text"
                            istextArea
                            onChange={newAuctionDataHandler("description")}
                        />
                    </label>
                    <label>
                        <span>Initial price</span>
                        <Input
                            name="initial-price"
                            type="number"
                            min="1"
                            onChange={newAuctionDataHandler("initial_price")}
                        />
                    </label>
                    <label>
                        <span>Minimal bid step</span>
                        <Input
                            name="min-bid-price-gap"
                            type="number"
                            min="1"
                            onChange={newAuctionDataHandler(
                                "min_bid_price_gap",
                            )}
                        />
                    </label>
                    <label>
                        <span>Start time</span>
                        <Input
                            name="start-time"
                            type="date"
                            onChange={newAuctionDataHandler("start_time")}
                        />
                    </label>
                    <label>
                        <span>End time</span>
                        <Input
                            name="end-time"
                            type="date"
                            onChange={newAuctionDataHandler("end_time")}
                        />
                    </label>
                    <label>
                        <span>Active</span>
                        <input
                            name="active"
                            type={"checkbox"}
                            onChange={newAuctionDataHandler("active")}
                        />
                    </label>
                    <Button name="Create" onClick={handleAuctionCreation} />
                </div>
            </Modal>
        </>
    );
};

export default AuctionsPage;
