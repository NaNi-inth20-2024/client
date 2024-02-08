import { type Filters } from "../../../../common/types/types";
import Button from "../../../common/button/button";
import Input from "../../../common/input/input";

import styles from "./styles.module.scss";

type Props = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const FiltersSection = ({ filters, setFilters }: Props) => {
    const handlePriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            price: {
                ...filters.price,
                from: e.target.valueAsNumber,
            },
        });
    };

    const handlePriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            price: {
                ...filters.price,
                to: e.target.valueAsNumber,
            },
        });
    };

    const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            date: {
                ...filters.date,
                from: e.target.value,
            },
        });
    };

    const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            date: {
                ...filters.date,
                to: e.target.value,
            },
        });
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filter}>
                <span>Price</span>
                <div className={styles.filter__inputContainer}>
                    <Input
                        name="priceFrom"
                        type="number"
                        value={filters.price.from}
                        onChange={handlePriceFromChange}
                    />
                    <span>-</span>
                    <Input
                        name="priceTo"
                        type="number"
                        value={filters.price.to}
                        onChange={handlePriceToChange}
                    />
                    <Button name="Ok" />
                </div>
            </div>
            <span className={styles.separator}></span>
            <div className={styles.filter}>
                <span>Date</span>
                <div className={`${styles.filter__inputContainer} ${styles.filter__inputContainer_column}`}>
                    <Input
                        name="dateFrom"
                        type="date"
                        value={filters.date.from}
                        onChange={handleDateFromChange}
                    />
                    <Input
                        name="dateTo"
                        type="date"
                        value={filters.date.to}
                        onChange={handleDateToChange}
                    />
                    <Button name="Ok" />
                </div>
            </div>
        </div>
    );
};

export default FiltersSection;
