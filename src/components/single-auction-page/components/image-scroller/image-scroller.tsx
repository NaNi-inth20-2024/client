import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type Props = {
    images: string[];
};

const ImageScroller = ({ images }: Props) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    return (
        <div className={styles["imageScroller"]}>
            <img
                src={images[currentImageIndex]}
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
                        onClick={() => setCurrentImageIndex(index)}
                    />
                ))}
            </div>
            
        </div>
    );
};

export default ImageScroller;
