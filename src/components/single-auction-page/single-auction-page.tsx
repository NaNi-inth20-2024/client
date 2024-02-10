import Button from "../common/button/button";
import ImageScroller from "./components/image-scroller/image-scroller";

import styles from "./styles.module.scss";

const SingleAuctionPage = () => {
    return (
        <div className={styles.singleAuctionPage}>
            <div className={styles.auction__info}>
                <ImageScroller
                    images={[
                        "https://via.placeholder.com/200x200?text=Image+1",
                        "https://via.placeholder.com/200x200?text=Image+2",
                        "https://via.placeholder.com/200x200?text=Image+3",
                        "https://via.placeholder.com/200x200?text=Image+4",
                        "https://via.placeholder.com/200x200?text=Image+5",
                        "https://via.placeholder.com/200x200?text=Image+6",
                        "https://via.placeholder.com/200x200?text=Image+7",
                        "https://via.placeholder.com/200x200?text=Image+8",
                        "https://via.placeholder.com/200x200?text=Image+9",
                        "https://via.placeholder.com/200x200?text=Image+10",
                    ]}
                />
                <div className={styles.auction__infoDetails}>
                    <div className={styles.auction__infoDetailsHeader}>
                        <h2>Product name</h2>
                        <span>Current price: $100</span>
                    </div>
                    <span className={styles.auction__infoDetailsSeller}>
                        Seller: <span>John Doe</span>
                    </span>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Labore velit nihil repellendus expedita eum
                        delectus optio consequuntur dignissimos ea, doloremque
                        earum, nulla atque odio, facilis ut adipisci itaque!
                        Aliquam, odit.
                    </p>
                </div>
                <div className={styles.auction__infoActions}>
                    <Button name="Edit informaton" />
                    <Button classname={styles.button_red} name="End auction" />
                </div>
            </div>
            <div className={styles.auction__bidInfo}>zaza</div>
        </div>
    );
};

export default SingleAuctionPage;
