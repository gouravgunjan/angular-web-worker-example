import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WorkerClient, WorkerManager } from 'angular-web-worker/angular';
import { ExampleWorker } from './example.worker';
import { longOperation } from './long-operation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  
  result = 0;
  sliderTranslate = 'translateX(0px)';

  private client: WorkerClient<ExampleWorker>;
  private animation = {
    translate: 0,
    rightDirection: true
  };

  constructor(private workerManager: WorkerManager) {
    this.client = this.workerManager.createClient(ExampleWorker);
  }

  ngOnInit(): void {
    this.client.connect();
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(this.animateFrame.bind(this))
  }

  private animateFrame(): void {
    this.animation.translate = this.animation.rightDirection ?
                                this.animation.translate + 5 :
                                this.animation.translate - 5;

    if (this.animation.translate > (window.innerWidth * 0.2) + 40) {
      this.animation.rightDirection = false;
    } else if (this.animation.translate < 0){
      this.animation.rightDirection = true;
    }
    this.sliderTranslate = `translateX(${this.animation.translate}px)`;
    requestAnimationFrame(this.animateFrame.bind(this));
  }

  async handleLongOperation(): Promise<void> {
    this.result = await this.client.call(w => w.doLongOperation());
    // this.result = longOperation(2500);
  }
}
