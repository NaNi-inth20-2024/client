import { API } from "@/common/enums/api.enum";
import { Auction } from "../../../../common/types/types";

import styles from "./styles.module.scss";

type Props = {
    auction: Auction;
};

const AuctionCard = ({ auction }: Props) => {
    return (
        <div className={styles.auctionCard}>
            <img src={`${API.MEDIA_URL}${auction.images[0]?.photo}`} alt={auction.title} />
            <span className={styles.auctionCard__name}>{auction.title}</span>
            <span>{auction.initial_price} $</span>
        </div>
    );
};

export default AuctionCard;
