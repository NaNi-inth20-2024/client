import { FC } from "react";
import Input from "../common/input/input";

import { useState } from "react";

import styles from "./styles.module.scss";
import FiltersSection from "./components/filters/filters";
import { Filters } from "../../common/types/types";

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

    return (
        <div className={styles.auctionsPage}>
            <FiltersSection filters={filters} setFilters={setFilters} />
        </div>
    );
};

export default AuctionsPage;
