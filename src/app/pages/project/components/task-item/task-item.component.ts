import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() data: any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  taskForm = this.formBuilder.group({
    estimate: [""],
    complete: [""],
    remaining: [""]
  })

  ngOnInit(): void {
    this.taskForm.get("estimate")?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(data => {
      console.log(data)
    })

    this.taskForm.get("complete")?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(data => {
      console.log(data)
    })

    this.taskForm.get("remaining")?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(data => {
      console.log(data)
    })
  }

}
