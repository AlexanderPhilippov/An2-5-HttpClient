import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskModel } from './../../models/task.model';
import { TaskArrayService, TaskPromiseService } from './../../services/task-promise.service';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Promise<Array<TaskModel>>;

  constructor(
    private router: Router,
    private taskPromiseService: TaskPromiseService
  ) {}

  ngOnInit() {
    this.tasks = this.taskPromiseService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    const updatedTask = { ...task, done: true };
    this.taskArrayService.updateTask(updatedTask);
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
}

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }
  onDeleteTask(task: TaskModel) {
    this.taskPromiseService
      .deleteTask(task)
      .then(() => (this.tasks = this.taskPromiseService.getTasks()))
      .catch(err => console.log(err));
  }

}
