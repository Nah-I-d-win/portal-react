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

    public mul(other: Complex): Complex {
        return new Complex(
            this._re * other.re - this._im * other.im,
            this._re * other.im + this._im * other.re,
        );
    }

    public arg_sq(): number {
        return this._re * this._re + this._im * this._im;
    }
}
