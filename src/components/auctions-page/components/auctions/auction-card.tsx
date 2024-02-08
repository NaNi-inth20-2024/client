import { Auction } from "../../../../common/types/types";

import styles from "./styles.module.scss";

type Props = {
    auction: Auction;
};

const AuctionCard = ({ auction }: Props) => {
    return (
        <div className={styles.auctionCard}>
            <img src={auction.img} alt={auction.name} />
            <span className={styles.auctionCard__name}>{auction.name}</span>
            <span>{auction.price} $</span>
        </div>
    );
};

export default AuctionCard;
