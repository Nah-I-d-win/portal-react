export interface ServerDto {
    config: ServerConfig;
    tiles: Range[];
    tasksQueue: FragmentTask[];
    range: Range;
    currentFractal: number;
    fractals: FractalDescriptor[];
    workers: { [key: string]: Worker }; // Assuming SocketAddr can be represented as string keys
}

export interface FragmentTask {
    id: U8Data;
    fractal: FractalDescriptor;
    maxIteration: number;
    resolution: Resolution;
    range: Range;
}

export type FractalDescriptor =
    | Julia
    | Mandelbrot
    | IteratedSinZ
    | NewtonRaphsonZ3
    | NewtonRaphsonZ4
    | NovaNewtonRaphsonZ3
    | NovaNewtonRaphsonZ4;

// Define the individual fractal interfaces, assuming similar fields to Rust structs (adjust as needed)
export interface Julia {
    /* fields */
}
export interface Mandelbrot {
    /* fields */
}
export interface IteratedSinZ {
    /* fields */
}
export interface NewtonRaphsonZ3 {
    /* fields */
}
export interface NewtonRaphsonZ4 {
    /* fields */
}
export interface NovaNewtonRaphsonZ3 {
    /* fields */
}
export interface NovaNewtonRaphsonZ4 {
    /* fields */
}

export interface U8Data {
    offset: number;
    count: number;
}

interface ServerConfig {
    address: string;
    port: number;
    width: number;
    height: number;
    tiles: number;
    range: Range;
    speed: number;
    graphics: boolean;
    portal: boolean;
}

export interface Point {
    x: number;
    y: number;
}

export interface Range {
    min: Point;
    max: Point;
}
export interface Resolution {
    nx: number;
    ny: number;
}

export interface PixelData {
    offset: number;
    count: number;
}

export interface Worker {
    /* fields */
}
