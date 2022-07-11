import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() listComment: Comment[] = [];
  @Input() shouldSubmit$ = new Subject();
  @Output() onSubmit = new EventEmitter();

  currentEditingComment$ = new Subject<string>();
  destroyed$ = new Subject();
  editingCommentId: string = '';
  commentForm = this.formBuilder.group({
    content: [''],
  });
  triggerUpdate$ = new Subject();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.shouldSubmit$
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          if (this.editingCommentId) {
            this.triggerUpdate$.next();
          } else {
            this.handleSubmitComment();
          }
        }),
      )
      .subscribe();

    this.currentEditingComment$
      .pipe(
        takeUntil(this.destroyed$),
        tap((data: string) => {
          if (data) {
            this.editingCommentId = data;
            this.commentForm.controls['content'].disable();
          } else {
            this.commentForm.controls['content'].enable();
          }
        }),
      )
      .subscribe();
  }

  handleSubmitComment(): void {
    this.onSubmit.emit({ mode: 'add', ...this.commentForm.value });
    this.commentForm.reset();
  }

  handleUpdateComment(data: { content: string; commentId: string }): void {
    this.onSubmit.emit({ mode: 'edit', ...data });
    this.currentEditingComment$.next();
  }

  handleDeleteComment(commentId: string): void {
    this.onSubmit.emit({ mode: 'delete', commentId });
  }

  setUpdateCommentId(id: string): void {
    this.currentEditingComment$.next(id);
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
