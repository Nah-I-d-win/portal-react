export interface ServerDto {
    config: ServerConfig;
    tiles: Range[];
    tasksQueue: FragmentTask[];
    range: Range;
    currentFractal: number;
    fractals: FractalDescriptor[];
    workers: { [key: string]: Worker };
}

export interface Worker {
    address: string;
    maximal_work_load: number;
    name: string;
    port: number;
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

export interface Julia {
}
export interface Mandelbrot {
}
export interface IteratedSinZ {
}
export interface NewtonRaphsonZ3 {
}
export interface NewtonRaphsonZ4 {
}
export interface NovaNewtonRaphsonZ3 {
}
export interface NovaNewtonRaphsonZ4 {
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
