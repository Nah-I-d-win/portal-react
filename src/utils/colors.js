export var ColorPalette;
(function (ColorPalette) {
    ColorPalette[ColorPalette["Classic"] = 0] = "Classic";
    ColorPalette[ColorPalette["Inverted"] = 1] = "Inverted";
    ColorPalette[ColorPalette["Viridis"] = 2] = "Viridis";
    ColorPalette[ColorPalette["Plasma"] = 3] = "Plasma";
    ColorPalette[ColorPalette["Magma"] = 4] = "Magma";
    ColorPalette[ColorPalette["Inferno"] = 5] = "Inferno";
    ColorPalette[ColorPalette["Grayscale"] = 6] = "Grayscale";
    ColorPalette[ColorPalette["NewtonRaphson"] = 7] = "NewtonRaphson";
    ColorPalette[ColorPalette["Custom1"] = 8] = "Custom1";
    ColorPalette[ColorPalette["Custom2"] = 9] = "Custom2";
})(ColorPalette || (ColorPalette = {}));
export class PaletteHandler {
    constructor() {
        Object.defineProperty(this, "currentPalette", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.currentPalette = ColorPalette.Classic;
    }
    static variantCount() {
        return Object.keys(ColorPalette).length / 2; // Divided by 2 because enum creates a reverse mapping
    }
    static fromIndex(index) {
        if (index >= 0 && index < this.variantCount()) {
            return index;
        }
        return undefined;
    }
    cyclePaletteForward() {
        const paletteCount = PaletteHandler.variantCount();
        const currentIdx = this.currentPalette.valueOf();
        const nextIdx = (currentIdx + 1) % paletteCount;
        this.currentPalette = PaletteHandler.fromIndex(nextIdx);
    }
    cyclePaletteBackward() {
        const paletteCount = PaletteHandler.variantCount();
        const currentIdx = this.currentPalette.valueOf();
        const nextIdx = (currentIdx + paletteCount - 1) % paletteCount;
        this.currentPalette = PaletteHandler.fromIndex(nextIdx);
    }
    classicPalette(t) {
        const r = Math.floor(9 * (1 - t) * t * t * t * 255);
        const g = Math.floor(15 * (1 - t) * (1 - t) * t * t * 255);
        const b = Math.floor(8.5 * (1 - t) * (1 - t) * (1 - t) * t * 255);
        return [r, g, b, 255];
    }
    // Inverted Palette
    invertedPalette(t) {
        const [r, g, b] = this.classicPalette(t);
        return [255 - r, 255 - g, 255 - b, 255];
    }
    // Grayscale Palette
    grayscalePalette(t) {
        const intensity = Math.floor(t * 255);
        return [intensity, intensity, intensity, 255];
    }
    // Custom Palette Calculation (shared by Custom1 and Custom2)
    calculateCustomPalette(t, a, b, c, d) {
        const calc = (idx) => {
            const component = [a, b, c, d][idx];
            return (component[0] +
                component[1] * Math.cos(6.283185 * (component[2] * t + component[3])));
        };
        const red = calc(0) * 255;
        const green = calc(1) * 255;
        const blue = calc(2) * 255;
        return [red, green, blue].map((v) => Math.max(0, Math.min(255, Math.floor(v))));
    }
    // Custom1 Palette
    custom1Palette(t) {
        return this.calculateCustomPalette(t, [0.5, 0.5, 1.0, 0.0], [0.5, 0.5, 1.0, 0.33], [1.0, 1.0, 1.0, 0.67], [0.0, 0.33, 0.67, 0.0]);
    }
    // Custom2 Palette
    custom2Palette(t) {
        return this.calculateCustomPalette(t, [0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5], [1.0, 1.0, 1.0, 1.0], [0.0, 0.1, 0.2, 0.0]);
    }
    // Additional palettes like Viridis, Plasma, Magma, Inferno, and NewtonRaphson can be implemented here following a similar pattern
    // Method to select and apply the current palette
    calculateColor(t) {
        switch (this.currentPalette) {
            case ColorPalette.Classic:
                return this.classicPalette(t);
            case ColorPalette.Inverted:
                return this.invertedPalette(t);
            case ColorPalette.Grayscale:
                return this.grayscalePalette(t);
            case ColorPalette.Custom1:
                return this.custom1Palette(t);
            case ColorPalette.Custom2:
                return this.custom2Palette(t);
            // Add case statements for other palettes here
            default:
                return [0, 0, 0, 0]; // Fallback color
        }
    }
}
