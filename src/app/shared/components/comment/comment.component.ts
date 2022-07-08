import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() listComment: Comment[] = [];
  @Output() onSubmit = new EventEmitter();

  commentForm = this.formBuilder.group({
    content: [''],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  handleSubmitComment(): void {
    this.onSubmit.emit(this.commentForm.value);
    this.commentForm.reset();
  }

  changeInput(input: HTMLTextAreaElement): void {
    input.style.height = '';
    input.style.height = input.scrollHeight + 'px';
  }
}
