import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-edittasks',
  templateUrl: './edittasks.component.html',
  styleUrls: ['./edittasks.component.css']
})
export class EdittasksComponent implements OnInit {

  task: Task[];
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(task => {
      // console.log(task);
      this.task = task;
    });
  }




}
