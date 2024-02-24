export class FragmentRequest {
  worker_name: string;
  maximal_work_load: number;

  constructor(worker_name: string, maximal_work_load: number) {
    this.worker_name = worker_name;
    this.maximal_work_load = maximal_work_load;
  }
}
