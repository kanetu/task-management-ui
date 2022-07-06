import { Component, Inject, Input, OnInit } from '@angular/core';
import { DATE_FORMAT_DETAIL } from 'src/app/constants/date-format';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() listComment: Comment[] = [
    {
      id: '1',
      content: 'Good job Kane! ',
      createAt: new Date(),
      updateAt: new Date(),
      user: {
        avatarUrl:
          'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=399&q=80',
        birthday: '2022-07-06T03:12:22.192Z',
        createAt: new Date(),
        updateAt: new Date(),
        email: 'admin@gmail.com',
        id: '1',
        isActive: false,
        name: 'Hieu Kane',
        phoneNumber: '',
        role: '',
      },
    },
  ];
  constructor(@Inject('MomentWrapper') private momentWrapper: any) {}

  ngOnInit(): void {
    this.listComment = this.listComment.map((item) => ({
      ...item,
      createAt: this.momentWrapper(item.createAt).format(DATE_FORMAT_DETAIL),
      updateAt: this.momentWrapper(item.updateAt).format(DATE_FORMAT_DETAIL),
    }));
  }

  handleSubmitComment(): void {}
}
