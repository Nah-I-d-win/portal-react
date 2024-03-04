import { jsx as _jsx } from "react/jsx-runtime";
import { useGallery } from "../app/hooks/useGallery";
const FractalGallery = () => {
    const images = useGallery(import.meta.env.VITE_REACT_APP_GALLERY_URL || "");
    return (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: images.map((image) => (_jsx("div", { children: _jsx("img", { className: "h-auto max-w-full rounded-lg", src: image.url, alt: image.alt }) }, image.key))) }));
};
export default FractalGallery;
