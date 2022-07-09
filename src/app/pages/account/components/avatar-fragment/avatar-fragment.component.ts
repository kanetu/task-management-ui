import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { questionIcon } from 'src/app/shared/icons';

@Component({
  selector: 'app-avatar-fragment',
  templateUrl: './avatar-fragment.component.html',
  styleUrls: ['./avatar-fragment.component.scss'],
})
export class AvatarFragmentComponent implements OnInit {
  @Input() avatarUrl: string;
  @Output() onUpdateAvatar = new EventEmitter<any>();

  questionIcon = questionIcon;
  avatarForm = this.formBuilder.group({
    avatarUrl: [''],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    console.log(this.avatarForm.value);
    this.onUpdateAvatar.next(this.avatarForm.value);
  }
}
