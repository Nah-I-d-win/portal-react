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

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Range {
  min: Point;
  max: Point;

  constructor(min: Point, max: Point) {
    this.min = min;
    this.max = max;
  }
}

export class Resolution {
  nx: number;
  ny: number;

  constructor(nx: number, ny: number) {
    this.nx = nx;
    this.ny = ny;
  }
}

export class PixelData {
  offset: number;
  count: number;

  constructor(offset: number, count: number) {
    this.offset = offset;
    this.count = count;
  }
}

export class U8Data {
  offset: number;
  count: number;

  constructor(offset: number, count: number) {
    this.offset = offset;
    this.count = count;
  }
}
