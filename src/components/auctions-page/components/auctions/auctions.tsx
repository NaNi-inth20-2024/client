import { Auction } from "../../../../common/types/auction.type";
import AuctionCard from "./auction-card";

import styles from "./styles.module.scss";

type Props = {
    auctions: Auction[];
};

const Auctions = ({ auctions }: Props) => {
    return (
        <div className={styles.auctionsContainer__auctions}>
            {auctions.map((auction) => {
                return <AuctionCard key={auction.id} auction={auction} />;
            })}
        </div>
    );
};

export default Auctions;
