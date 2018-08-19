import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-addtasks',
  templateUrl: './addtasks.component.html',
  styleUrls: ['./addtasks.component.css']
})

export class AddtasksComponent implements OnInit {

  task: Task = {
    taskName: '',
    isTaskDone: false,
  };

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  submitThis() {
    if (this.task.taskName) {
      this.taskService.addTasks(this.task);
      this.task.taskName = '';
      this.task.isTaskDone = false;
    }
  }


}
