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
  @Input() allowOk = true;
  @Output() onOk = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();

  saveIcon = saveIcon;
  saveType = 'save';
  firstSubmit = false;
  constructor() {}

  ngOnInit(): void {}

  handleOnOk() {
    this.firstSubmit = true;
    this.onOk.emit(this.saveType);
  }

  handleOnCancel() {
    this.onCancel.emit();
  }

  handleChangeSaveType(type: string): void {
    this.saveType = type;
  }
}
