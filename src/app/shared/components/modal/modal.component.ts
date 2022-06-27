import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() onOk = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  handleOnOk() {
    this.onOk.emit('');
  }

  handleOnCancel() {
    this.onCancel.emit();
  }
}
