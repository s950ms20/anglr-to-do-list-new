import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Task } from '../models/task';
import { pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  taskDoc: AngularFirestoreDocument<Task>;

  constructor(private afs: AngularFirestore) {

  this.tasksCollection = this.afs.collection('tasks', ref => ref.orderBy('isTaskDone', 'asc')
);


    this.tasks = this.afs.collection('tasks').snapshotChanges()
    .pipe(
      map(actions => actions.map(
        a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return { id, ...data };
        }
      ))
    );
  }

  getTasks() {
    return this.tasks;
  }

  addTasks(task: Task) {
    this.tasksCollection.add(task);
  }

  deleteTask(task: Task) {
    this.taskDoc = this.afs.doc(`tasks/${task.id}`);
    this.taskDoc.delete();
  }

  updateTask(task: Task) {
    this.taskDoc = this.afs.doc(`tasks/${task.id}`);
    this.taskDoc.update(task);
  }

  // sortBy(a, b) {
  //   console.log(a, b, this.tasksCollection, this.afs);
  //   const arg1 = a.toString();
  //   const arg2 = b.toString();
  //   this.tasksCollection = this.afs.collection('tasks', ref => ref.orderBy(arg1, arg2));
  // }


}

