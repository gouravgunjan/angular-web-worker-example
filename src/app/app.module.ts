import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WorkerModule } from 'angular-web-worker/angular'

import { AppComponent } from './app.component';
import { ExampleWorker } from './example.worker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WorkerModule.forWorkers([
      {worker: ExampleWorker, initFn: () => new Worker(new URL('./example.worker.ts', import.meta.url), {type: 'module'})},
      // {worker: ExampleWorker, initFn: () => new Worker('./example.worker.ts', {type: 'module'})},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
