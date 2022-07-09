import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent implements OnInit {
  @Input() public value: string;

  public svgIcon: any;

  constructor(private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(this.value);
  }
}
