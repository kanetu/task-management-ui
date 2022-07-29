import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() set isShow(value: boolean) {
    if (value) {
      setTimeout(() => {
        this.keepShowing = value;
        setTimeout(() => {
          this.keepShowing = !value;
        }, 500);
      }, 500);
    }
  }
  get visible(): boolean {
    return this.keepShowing;
  }
  keepShowing = true;

  constructor() {}

  ngOnInit(): void {
    if (this.isShow) {
      this.keepShowing = true;
    }
    if (!this.isShow) {
      setTimeout(() => {
        this.keepShowing = false;
      }, 500);
    }
  }
}
