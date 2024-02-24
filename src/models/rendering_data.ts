import FragmentResult from "./fragment_result";

export class RenderingData {
  result: FragmentResult;
  worker: string;
  iterations: number[];

  constructor(result: FragmentResult, worker: string, iterations: number[]) {
    this.result = result;
    this.worker = worker;
    this.iterations = iterations;
  }
}
