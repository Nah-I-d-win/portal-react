export interface Fractal {
    generate(x: number, y: number): [number, number];
}

export function color(t: number): [number, number, number] {
    const a = [0.5, 0.5, 0.5];
    const b = [0.5, 0.5, 0.5];
    const c = [1.0, 1.0, 1.0];
    const d = [0.0, 0.1, 0.2];

    const red = b[0] * Math.cos(6.28318 * (c[0] * t + d[0])) + a[0];
    const green = b[1] * Math.cos(6.28318 * (c[1] * t + d[1])) + a[1];
    const blue = b[2] * Math.cos(6.28318 * (c[2] * t + d[2])) + a[2];
    return [255.0 * red, 255.0 * green, 255.0 * blue];
}
