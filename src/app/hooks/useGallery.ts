import { useEffect, useState } from "react";
import axios from "axios";

interface Image {
    key: string;
    url: string;
    alt: string;
}

export const useGallery = (url: string) => {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { data } = await axios.get(url);
                setImages(JSON.parse(data.body));
            } catch (error) {
                console.error("Failed to fetch images:", error);
            }
        };

        fetchImages();
    }, [url]);

    return images;
};
