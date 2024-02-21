export class Complex {
  _re: number;
  _im: number;

  constructor(re: number, im: number) {
    this._re = re;
    this._im = im;
  }

  get re() {
    return this._re;
  }

  get im() {
    return this._im;
  }

  public add(other: Complex): Complex {
    return new Complex(this._re + other.re, this._im + other.im);
  }

  public sub(other: Complex): Complex {
    return new Complex(this._re - other.re, this._im - other.im);
  }

  public mul(other: Complex): Complex {
    return new Complex(
      this._re * other.re - this._im * other.im,
      this._re * other.im + this._im * other.re,
    );
  }

  public div(other: Complex): Complex {
    const denom = other.re * other.re + other.im * other.im;
    return new Complex(
      (this.re * other.re + this.im * other.im) / denom,
      (this.im * other.re - this.re * other.im) / denom,
    );
  }

  public arg_sq(): number {
    return this._re * this._re + this._im * this._im;
  }

  public arg(): number {
    return (Math.atan2(this.im, this.re) / (2.0 * Math.PI)) % 1.0;
  }

  public sin(): Complex {
    const re = Math.sin(this.re) * Math.cosh(this.im);
    const im = Math.cos(this.re) * Math.sinh(this.im);
    return new Complex(re, im);
  }
}
