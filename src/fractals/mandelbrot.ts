import { Complex } from "../models/complex";
import { Fractal } from "./fractal";

export class Mandelbrot implements Fractal {
    generate(x: number, y: number): [number, number] {
        let z = new Complex(0.0, 0.0);
        const c = new Complex(x, y);

        const max_iterations = 256;
        let i = 0;
        while (i < max_iterations && z.arg_sq() < 32.0) {
            z = z.mul(z).add(c);
            i++;
        }

        return [i, i - Math.log2(Math.log2(z.arg_sq())) / max_iterations];
    }
}
