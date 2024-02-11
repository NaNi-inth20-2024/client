import { useEffect, useRef, useState } from "react";
import Button from "../common/button/button";
import Input from "../common/input/input";
import Modal from "../common/modal/modal";
import ImageScroller from "./components/image-scroller/image-scroller";
import InfoHistory from "./components/info-history/info-history";

import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBid, replaceBids } from "@/store/bid/bid.slice";
import { useParams } from "react-router-dom";
import { useGetAuctionByIdQuery } from "@/store/auctions.api";
import { API } from "@/common/enums/api.enum";

const SingleAuctionPage = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPlaceBidModalOpen, setIsPlaceBidModalOpen] = useState(false);

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


    useEffect(() => {
        ws.current = new WebSocket(
            `ws://20.82.148.177:8000/api/v1/ws/auctions/${params.id}/bids/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4MjY5Mzk5LCJpYXQiOjE3MDc2NjQ1OTksImp0aSI6IjEyMWQ3NThhYTllZjQ2NjJiZGJhNjJmZGEzOGE3ODJjIiwidXNlcl9pZCI6NH0.evNVQRkZlhGt_rcHSPL79DxAi21ZyW0yVoeGtIqAung`,
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
            } else {
                dispatch(addBid(data));
            }
        };

        return () => {
            ws.current?.close();
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
                            <Button
                                name="Edit informaton"
                                onClick={() => setIsEditModalOpen(true)}
                            />
                            <Button
                                classname={styles.button_red}
                                name="End auction"
                            />
                        </div>
                    </div>
                    <div className={styles.auction__bidInfo}>
                        <div className={styles.auction__bidInfoHeader}>
                            <span>
                                Your bid:{" "}
                                <span className={styles.highlighted}>
                                    1000$
                                </span>
                            </span>
                            <Button
                                name="+ Place a bid"
                                onClick={() => setIsPlaceBidModalOpen(true)}
                            />
                        </div>
                        <InfoHistory
                            actions={bids.map((bid) => ({
                                username: bid.author.username,
                                action: `${bid.price}$`,
                            }))}
                            title="Bid history"
                        />
                        <InfoHistory
                            actions={[
                                { username: "John Doe", action: "1000$" },
                                { username: "John Doe", action: "1000$" },
                            ]}
                            title="Top bids"
                        />
                    </div>
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
                    <label>
                        <span>Your bid</span>
                        <Input name="your-bid" type="number" />
                    </label>
                    <Button name="Place a bid" onClick={() => {}} />
                </div>
            </Modal>
        </>
    );
};

export default SingleAuctionPage;
