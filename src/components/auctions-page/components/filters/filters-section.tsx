import { type Filters } from "../../../../common/types/types";
import Button from "../../../common/button/button";
import Input from "../../../common/input/input";

import styles from "./styles.module.scss";

type Props = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    filtersValueChangeHandler: (
        property: keyof Filters,
    ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    onApplyFilters: () => void;
    device?: "mobile" | "desktop";
};

const FiltersSection = ({
    filters,
    filtersValueChangeHandler,
    onApplyFilters,
    device = "desktop",
}: Props) => {
    const fromPriceMaximumBound = String(
        filters?.priceTo ? filters?.priceTo - 1 : 0,
    );

    const toPriceMinimumBound = String(
        filters?.priceFrom ? filters?.priceFrom + 1 : 1,
    );
    return (
        <div
            className={`${styles.filterContainer} ${styles[`filterContainer_${device}`]}`}
        >
            <div className={styles.filter}>
                <span>Price</span>
                <div className={styles.filter__inputContainer}>
                    <Input
                        name="priceFrom"
                        type="number"
                        value={filters?.priceFrom ?? 0}
                        max={fromPriceMaximumBound}
                        min={"0"}
                        onChange={filtersValueChangeHandler("priceFrom")}
                    />
                    <span>-</span>
                    <Input
                        name="priceTo"
                        type="number"
                        value={filters?.priceTo ?? 0}
                        min={toPriceMinimumBound}
                        onChange={filtersValueChangeHandler("priceTo")}
                    />
                </div>
            </div>
            <span className={styles.separator}></span>
            <div className={styles.filter}>
                <span>Date</span>
                <div
                    className={`${styles.filter__inputContainer} ${styles.filter__inputContainer_column}`}
                >
                    <Input
                        name="dateFrom"
                        type="datetime-local"
                        value={filters?.dateFrom ?? ""}
                        max={filters?.dateTo ?? ""}
                        onChange={filtersValueChangeHandler("dateFrom")}
                    />
                    <Input
                        name="dateTo"
                        type="datetime-local"
                        value={filters?.dateTo ?? ""}
                        min={filters?.dateFrom ?? ""}
                        onChange={filtersValueChangeHandler("dateTo")}
                    />
                </div>
            </div>
            <Button
                name="Search"
                onClick={onApplyFilters}
                classname={styles.filter__button}
            />
        </div>
    );
};

export default FiltersSection;
