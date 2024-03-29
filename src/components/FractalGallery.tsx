import React from "react";
import { useGallery } from "../app/hooks/useGallery";

const FractalGallery: React.FC = () => {
    const images = useGallery("https://48t54gy4p1.execute-api.eu-west-1.amazonaws.com/Prod/gallery");

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
                <div key={image.key}>
                    <img
                        className="h-auto max-w-full rounded-lg"
                        src={image.url}
                        alt={image.alt}
                    />
                </div>
            ))}
        </div>
    );
};

export default FractalGallery;
