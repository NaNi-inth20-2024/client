import { useEffect, useRef, useState } from "react";
import Button from "../common/button/button";
import Input from "../common/input/input";
import Modal from "../common/modal/modal";
import ImageScroller from "./components/image-scroller/image-scroller";
import InfoHistory from "./components/info-history/info-history";

import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    addBid,
    addTopBid,
    clearBids,
    clearTopBids,
    replaceBids,
    replaceTopBids,
} from "@/store/bid/bid.slice";
import { useParams } from "react-router-dom";
import { useGetAuctionByIdQuery } from "@/store/auctions.api";
import { API } from "@/common/enums/api.enum";
import { localStorageService } from "@/services/services";
import { TOKEN_NAME } from "@/common/enums/auth.enum";
import { useRevalidateQuery } from "@/store/auth.api";

const SingleAuctionPage = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPlaceBidModalOpen, setIsPlaceBidModalOpen] = useState(false);

    const [bid, setBid] = useState("");
    const { data: user } = useRevalidateQuery(undefined);

    const params = useParams();

    const {
        data: auction,
        isLoading,
        isError,
        isSuccess,
    } = useGetAuctionByIdQuery(Number(params.id));

    const dispatch = useAppDispatch();

    const ws = useRef<WebSocket | null>(null);
    const bids = useAppSelector((state) => state.bid.bids);
    const topBids = useAppSelector((state) => state.bid.topBids);

    const thisUserBid = bids.find((bid) => bid.author.id === user?.id)?.price;

    useEffect(() => {
        const token = localStorageService.getByKey(TOKEN_NAME.ACCESS);
        console.log(token);
        if (!token) {
            return;
        }
        ws.current = new WebSocket(
            `ws://20.82.148.177:8000/api/v1/ws/auctions/${params.id}/bids/?token=${localStorageService.getByKey(TOKEN_NAME.ACCESS)}`,
        );

        ws.current.onopen = () => {
            console.log("Connected to ws");
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.status_code === 409) {
                console.log(data.detail);
                return;
            }
            if (data.results) {
                dispatch(replaceBids(data.results));
                dispatch(replaceTopBids(data.highest_bids));
            } else {
                dispatch(addBid(data));
                dispatch(addTopBid(data));
            }
        };

        return () => {
            ws.current?.close();
            dispatch(clearBids());
            dispatch(clearTopBids());
        };
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="loader">
                    <span></span>
                </div>
            ) : (
                <div className={styles.singleAuctionPage}>
                    <div className={styles.auction__info}>
                        <ImageScroller
                            images={
                                auction?.images.map(
                                    (image) => `${API.MEDIA_URL}${image.photo}`,
                                ) || []
                            }
                        />
                        <div className={styles.auction__infoDetails}>
                            <div className={styles.auction__infoDetailsHeader}>
                                <h2>{auction?.title}</h2>
                                <span>
                                    Current price:{" "}
                                    {auction?.leader_bid
                                        ? auction?.leader_bid.price
                                        : auction?.initial_price}{" "}
                                    $
                                </span>
                            </div>
                            <p className={styles.auction__infoDetailsSeller}>
                                Seller: <span>{auction?.author.username}</span>
                            </p>
                            <p className={styles.auction__infoDetailsTime}>
                                {auction?.started ? "Started" : "Starts"}
                                <span>
                                    {new Date(
                                        auction?.start_time,
                                    ).toLocaleString()}
                                </span>
                            </p>
                            <p className={styles.auction__infoDetailsTime}>
                                {auction?.finished ? "Finished" : "Ends"}
                                <span>
                                    {new Date(
                                        auction?.end_time,
                                    ).toLocaleString()}
                                </span>
                            </p>
                            <p>{auction?.description}</p>
                        </div>
                        <div className={styles.auction__infoActions}>
                            {auction?.author.id === +user?.id && (
                                <Button
                                    name="Edit informaton"
                                    onClick={() => setIsEditModalOpen(true)}
                                />
                            )}
                        </div>
                    </div>
                    { user ? 
                    <div className={styles.auction__bidInfo}>
                        {auction?.finished ? (
                            <div className={styles.auction__finished}>
                                <h2>Auction is finished</h2>
                                <span>
                                    Winner:{" "}
                                    {auction?.leader_bid?.author.username}
                                </span>
                                <p>
                                    Price:{" "}
                                    <span className={styles.highlighted}>
                                        {auction?.leader_bid?.price}$
                                    </span>
                                </p>
                            </div>
                        ) : (
                            <>
                                {!auction?.started ? (
                                    <div className={styles.auction__notStarted}>
                                        <h2>Auction not started yet</h2>
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className={
                                                styles.auction__bidInfoHeader
                                            }
                                        >
                                            <span>
                                                Your bid:{" "}
                                                <span>{thisUserBid}$</span>
                                            </span>
                                            <Button
                                                name="+ Place a bid"
                                                onClick={() =>
                                                    setIsPlaceBidModalOpen(true)
                                                }
                                            />
                                        </div>
                                        <InfoHistory
                                            actions={bids.map((bid) => ({
                                                username: bid?.author.username,
                                                action: `${bid?.price}$`,
                                            }))}
                                            title="Bid history"
                                        />
                                        <InfoHistory
                                            actions={topBids.map((bid) => ({
                                                username: bid.author.username,
                                                action: `${bid.price}$`,
                                            }))}
                                            title="Top bids"
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </div>: <div className={`${styles.auction__bidInfo} ${styles.highlighted}` }>Log in to place a bid</div>}
                </div> 
            )}
            <Modal
                visible={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            >
                <div className={styles.edit_modal__content}>
                    <label>
                        <span>Product name</span>
                        <Input name="product-name" type="text" />
                    </label>
                    <label>
                        <span>Product description</span>
                        <Input
                            name="product-description"
                            type="text"
                            istextArea
                        />
                    </label>
                    <Button name="Save" />
                </div>
            </Modal>
            <Modal
                visible={isPlaceBidModalOpen}
                onClose={() => setIsPlaceBidModalOpen(false)}
            >
                <div className={styles.edit_modal__content}>
                    <span>
                        Minimal gap between bids is{" "}
                        <span className={styles.highlighted}>
                            {auction?.min_bid_price_gap}$
                        </span>
                    </span>
                    <label>
                        <span>Your bid</span>
                        <Input
                            name="your-bid"
                            type="number"
                            value={bid}
                            onChange={(e) => setBid(e.target.value)}
                        />
                    </label>
                    <Button
                        name="Place a bid"
                        onClick={() => {
                            ws.current?.send(JSON.stringify({ price: bid }));
                            setIsPlaceBidModalOpen(false);
                        }}
                    />
                </div>
            </Modal>
        </>
    );
};

export default SingleAuctionPage;
