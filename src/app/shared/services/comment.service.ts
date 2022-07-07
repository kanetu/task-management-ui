import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { API, baseAPI } from './apis';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  createTaskComment(taskId: string, body: any): Observable<Comment> {
    return this.http.post<Comment>(
      baseAPI + API.createTaskComment.replace('{{taskId}}', taskId),
      body,
    );
  }

  updateTaskComment(
    taskId: string,
    commentId: string,
    body: any,
  ): Observable<Comment> {
    return this.http.put<Comment>(
      baseAPI +
        API.updateTaskComment
          .replace('{{taskId}}', taskId)
          .replace('{{commentId}}', commentId),
      body,
    );
  }

  deleteTaskComment(taskId: string, commentId: string): Observable<never> {
    return this.http.delete<never>(
      baseAPI +
        API.updateTaskComment
          .replace('{{taskId}}', taskId)
          .replace('{{commentId}}', commentId),
    );
  }
}
