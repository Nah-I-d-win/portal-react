import { PixelData, Resolution, U8Data, Range } from "./server";

export default class FragmentResult {
    id: U8Data;
    resolution: Resolution;
    range: Range;
    pixels: PixelData;

    constructor(
        id: U8Data,
        resolution: Resolution,
        range: Range,
        pixels: PixelData,
    ) {
        this.id = id;
        this.resolution = resolution;
        this.range = range;
        this.pixels = pixels;
    }
}
