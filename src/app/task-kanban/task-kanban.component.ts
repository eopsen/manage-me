import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-kanban',
  templateUrl: './task-kanban.component.html',
  styleUrls: ['./task-kanban.component.scss']
})
export class TaskKanbanComponent implements OnInit {
  todo: Task[];
  inprogress: Task[];
  done: Task[];
  projectId: string;

  ngOnInit(): void {
    this._taskService.getProjectTasks(this.projectId).subscribe({
      next: (res) => {
        this.todo = res.filter((obj) => { return obj.state === 'TODO' });
        this.inprogress = res.filter((obj) => { return obj.state === 'DOING' });
        this.done = res.filter((obj) => { return obj.state === 'DONE' });
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.todo
  }

  constructor(
    private _taskService: TaskService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.projectId = this._route.snapshot.paramMap.get('id') ?? '';
    this.todo = [];
    this.inprogress = [];
    this.done = [];
  }

  dropOnTodoList(event: CdkDragDrop<Task[]>) {
    this.drop(event, 'TODO');
  }

  dropOnInprogressList(event: CdkDragDrop<Task[]>) {
    this.drop(event, 'DOING');
  }

  dropOnDoneList(event: CdkDragDrop<Task[]>) {
    this.drop(event, 'DONE');
  }
  drop(event: CdkDragDrop<Task[]>, stateToSet: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const taskId = event.previousContainer.data[event.previousIndex].id;
      var data = event.previousContainer.data[event.previousIndex];
      data.state = stateToSet;

      this._taskService.updateTask(taskId, data).subscribe({
        next: (res) => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  showTaskDetail(taskObj: Task) {
    console.log(taskObj);
  }

  navigateToProjects() {
    this._router.navigate(['/projects']);
  }
}
