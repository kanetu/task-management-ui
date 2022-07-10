import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { saveIcon } from '../../icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() modalWidth: string = '750px';
  @Output() onOk = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();

  saveIcon = saveIcon;
  saveType = 'save';

  constructor() {}

  ngOnInit(): void {}

  handleOnOk() {
    this.onOk.emit(this.saveType);
  }

  handleOnCancel() {
    this.onCancel.emit();
  }

  handleChangeSaveType(type: string): void {
    this.saveType = type;
  }
}
