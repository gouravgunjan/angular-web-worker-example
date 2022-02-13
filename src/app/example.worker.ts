import { AngularWebWorker, bootstrapWorker, Callable, OnWorkerInit } from 'angular-web-worker';
import { longOperation } from './long-operation';
/// <reference lib="webworker" />

 
@AngularWebWorker()
export class ExampleWorker implements OnWorkerInit {
  private counter = 0;
 
    constructor() {}
 
    onWorkerInit() {
      console.log('Hello, World');
    }

    @Callable()
    doLongOperation(): number {
      longOperation(2500);
      return ++this.counter;
    }
 
}
bootstrapWorker(ExampleWorker);