export class Complex {
    constructor(re, im) {
        Object.defineProperty(this, "_re", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_im", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._re = re;
        this._im = im;
    }
    get re() {
        return this._re;
    }
    get im() {
        return this._im;
    }
    add(other) {
        return new Complex(this._re + other.re, this._im + other.im);
    }
    sub(other) {
        return new Complex(this._re - other.re, this._im - other.im);
    }
    mul(other) {
        return new Complex(this._re * other.re - this._im * other.im, this._re * other.im + this._im * other.re);
    }
    div(other) {
        const denom = other.re * other.re + other.im * other.im;
        return new Complex((this.re * other.re + this.im * other.im) / denom, (this.im * other.re - this.re * other.im) / denom);
    }
    arg_sq() {
        return this._re * this._re + this._im * this._im;
    }
    arg() {
        return (Math.atan2(this.im, this.re) / (2.0 * Math.PI)) % 1.0;
    }
    sin() {
        const re = Math.sin(this.re) * Math.cosh(this.im);
        const im = Math.cos(this.re) * Math.sinh(this.im);
        return new Complex(re, im);
    }
}
