import { type Filters } from "../../../../common/types/types";
import Button from "../../../common/button/button";
import Input from "../../../common/input/input";
import { getInputDataChangeHandler } from "@/common/utils/forms.utils";

import styles from "./styles.module.scss";

type Props = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    onApplyFilters: () => void;
};

const FiltersSection = ({ filters, setFilters, onApplyFilters }: Props) => {
    const filtersValueChangeHandler =
        getInputDataChangeHandler<Filters>(setFilters);

    const fromPriceMaximumBound = String(
        filters?.priceTo ? filters?.priceTo - 1 : 0,
    );

    const toPriceMinimumBound = String(
        filters?.priceFrom ? filters?.priceFrom + 1 : 1,
    );
    return (
        <div className={styles.filterContainer}>
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
                        type="date"
                        value={filters?.dateFrom ?? ""}
                        max={filters?.dateTo ?? ""}
                        onChange={filtersValueChangeHandler("dateFrom")}
                    />
                    <Input
                        name="dateTo"
                        type="date"
                        value={filters?.dateTo ?? ""}
                        min={filters?.dateFrom ?? ""}
                        onChange={filtersValueChangeHandler("dateTo")}
                    />
                    <Button name="Apply filters" onClick={onApplyFilters} />
                </div>
            </div>
        </div>
    );
};

export default FiltersSection;
