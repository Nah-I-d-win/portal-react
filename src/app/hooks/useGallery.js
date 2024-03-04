import { useEffect, useState } from "react";
import axios from "axios";
export const useGallery = (url) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { data } = await axios.get(url);
                setImages(JSON.parse(data.body));
            }
            catch (error) {
                console.error("Failed to fetch images:", error);
            }
        };
        fetchImages();
    }, [url]);
    return images;
};
