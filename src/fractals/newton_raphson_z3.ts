import { Complex } from "../models/complex";
import { Fractal } from "./fractal";

export class NewtonRaphsonZ3 implements Fractal {
  fz(z: Complex): Complex {
    return z.mul(z).mul(z).sub(new Complex(1.0, 0.0));
  }

  dfz(z: Complex): Complex {
    return new Complex(3.0, 0.0).mul(z).mul(z);
  }

  static convergence_value(
    pzn: number,
    threshold: number,
    count: number,
    nmax: number,
  ): number {
    const accuracy = Math.log10(threshold);
    if (count < nmax) {
      return 0.5 - 0.5 * Math.cos(0.1 * (count - Math.log10(pzn) / accuracy));
    } else {
      return 1.0;
    }
  }

  generate(x: number, y: number): [number, number] {
    let z = new Complex(x, y);
    let zn_next: Complex;
    const epsilon = 1e-6;
    let i = 0;
    const max_iterations = 256;

    const continue_forever = true;
    while (continue_forever) {
      zn_next = z.sub(this.fz(z).div(this.dfz(z)));
      if (zn_next.sub(z).arg_sq() < epsilon || i >= max_iterations) {
        break;
      }
      z = zn_next;
      i += 1;
    }

    const zn = z.arg();
    let count: number;
    if (i < max_iterations) {
      count = NewtonRaphsonZ3.convergence_value(
        z.arg_sq(),
        epsilon,
        i,
        max_iterations,
      );
    } else {
      count = 1.0;
    }

    return [zn, i * count];
  }
}
