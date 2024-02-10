import { FC } from "react";
import Input from "../common/input/input";
import { useState } from "react";
import FiltersSection from "./components/filters/filters-section";
import { Filters } from "../../common/types/types";
import Button from "../common/button/button";
import Auctions from "./components/auctions/auctions";
import { useGetAuctionsQuery } from "@/store/auctions.api";

import styles from "./styles.module.scss";
import { getJoinedQueryParams } from "@/common/utils/requests.utils";
import { API } from "@/common/enums/api.enum";
import Modal from "../common/modal/modal";

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
    const [compiledFilters, setCompiledFilters] = useState<string>("");
    const [activeFilters, setActiveFilters] = useState<Filters>({
        priceFrom: null,
        priceTo: null,
        dateFrom: null,
        dateTo: null,
        search: null,
    });

    const {
        data: auctions,
        isLoading,
        refetch,
    } = useGetAuctionsQuery(compiledFilters);

    const handleFiltersApplication = () => {
        setCompiledFilters(
            getJoinedQueryParams(mapAuctionsFiltersToQueryNames(activeFilters)),
        );
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
                        <Button name="+ Create new auction" onClick={() => setIsCreateModalOpen(true)} />
                    </div>
                    <Auctions auctions={auctions || []} />
                </div>
            </div>
            <Modal visible={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <div className={styles.createModal}>
                    <label>
                        <span>Product name</span>
                        <Input name="product-name" type="text" />
                    </label>
                    <label>
                        <span>Product description</span>
                        <Input name="product-description" type="text" istextArea />
                    </label>
                    <label>
                        <span>Initial price</span>
                        <Input name="initial-price" type="number" />
                    </label>
                    <label>
                        <span>End time</span>
                        <Input name="end-time" type="date" />
                    </label>
                    <Button name="Create" />
                </div>
            </Modal>
        </>
    );
};

export default AuctionsPage;
