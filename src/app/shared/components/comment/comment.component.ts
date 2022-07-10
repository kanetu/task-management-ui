import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() listComment: Comment[] = [];
  @Input() shouldSubmit$ = new Subject();
  @Output() onSubmit = new EventEmitter();

  currentEditingComment$ = new EventEmitter();

  commentForm = this.formBuilder.group({
    content: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.shouldSubmit$
      .pipe(
        tap(() => {
          this.handleSubmitComment();
        }),
      )
      .subscribe();
  }

  handleSubmitComment(): void {
    this.onSubmit.emit(this.commentForm.value);
    this.commentForm.reset();
  }

  setUpdateCommentId(id: string): void {
    this.currentEditingComment$.next(id);
    console.log('this->', id);
  }
}
