import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';


@Component({
  selector: 'app-showtasks',
  templateUrl: './showtasks.component.html',
  styleUrls: ['./showtasks.component.css']
})
export class ShowtasksComponent implements OnInit {
  tasks: Task[];
  editState = false;
  taskToEdit: Task;

  constructor(private taskService: TaskService) {
   }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
        this.tasks = tasks;
      }
    );
  }

  editTask(event, task: Task) {
    this.editState = true;
    this.taskToEdit = task;
  }

  clearState() {
    this.editState = false;
    this.taskToEdit = null;
  }

  deleteTask(event, task: Task) {
    this.clearState();
    this.taskService.deleteTask(task);
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
    this.clearState();
  }

  changeStatus(task: Task) {
    this.taskToEdit.isTaskDone = !this.taskToEdit.isTaskDone;
    this.taskService.updateTask(task);
    this.clearState();
  }

  // sortBy(a, b) {
  //   this.sortBy(a, b);
  // }

}
