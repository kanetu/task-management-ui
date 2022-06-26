import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent implements OnInit {
  @Output() onDeactiveUser = new EventEmitter();

  constructor(private modal: NzModalService) {}

  ngOnInit(): void {}

  onDelete(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this account?',
      nzContent: `<b style="color: red;">By deleting your account, you will be unable to login KaneBan with this account.</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDeactiveUser.emit(),
      nzCancelText: 'No',
    });
  }
}
