import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { saveIcon } from '../../icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  _visible = false;

  @Input() set visible(value: boolean) {
    this._visible = value;
    if (value) {
      setTimeout(() => {
        this.titleRef.nativeElement.focus();
      }, 300);
    }
  }
  @Input() modalWidth: string = '750px';
  @Input() allowOk = true;
  @Output() onOk = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();

  @ContentChild('titleRef') titleRef: ElementRef;

  get visible(): boolean {
    return this._visible;
  }
  saveIcon = saveIcon;
  saveType = 'save';
  constructor() {}

  ngOnInit(): void {}

  handleOnOk() {
    this.onOk.emit(this.saveType);
  }

  ngOnChanges() {}

  handleOnCancel() {
    this.onCancel.emit();
  }

  handleChangeSaveType(type: string): void {
    this.saveType = type;
  }
}
