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
import { threeDotsIcon } from '../../icons';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit, OnDestroy {
  @Input() comment: Comment;
  @Input() currentEditingComment$ = new Subject();
  @Output() onUpdateCommentId = new EventEmitter();

  destroyed$ = new Subject();
  isEdit: boolean;
  threeDotsIcon = threeDotsIcon;
  updateCommentForm = this.formBuilder.group({
    content: [],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updateCommentForm.controls['content'].setValue(this.comment.content);
    this.currentEditingComment$
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          this.isEdit = data === this.comment.id;
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  editComment(): void {
    this.onUpdateCommentId.emit(this.comment.id);
  }

  deleteComment(): void {
    this.onUpdateCommentId.emit(this.comment.id);
  }
}
