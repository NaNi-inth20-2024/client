import { useState } from "react";

import styles from "./styles.module.scss";

type Props = {
    images: string[];
};

const ImageScroller = ({ images }: Props) => {
    const [currentImage, setCurrentImage] = useState(images[0]);

    return (
        <div className={styles["imageScroller"]}>
            <img
                src={currentImage}
                alt="Current image"
                className={styles["imageScroller__currentImage"]}
            />
            <div className={styles["imageScroller__scroller"]}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className={styles["imageScroller__scrollerImage"]}
                        onClick={() => setCurrentImage(image)}
                    />
                ))}
            </div>
            
        </div>
    );
};

export default ImageScroller;
