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
import { FunctionalityService } from '../services/functionality.service';
import { state } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import TaskDetailComponent from '../task-detail/task-detail.component';

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

  constructor(
    private _taskService: TaskService,
    private _functionalityService: FunctionalityService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog) {
    this.projectId = this._route.snapshot.paramMap.get('id') ?? '';
    this.todo = [];
    this.inprogress = [];
    this.done = [];
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
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
      let data = event.previousContainer.data[event.previousIndex];
      data.state = stateToSet;

      if (stateToSet == 'DOING') {
        data.startTime = (new Date()).toISOString();
      }

      if (stateToSet == 'DONE') {
        data.endTime = (new Date()).toISOString();
      }

      this._taskService.updateTask(taskId, data).subscribe({
        next: (res) => {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );

          this.updateFunctionalityState(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  showTaskDetail(taskObj: Task) {
    console.log(taskObj);
    this._dialog
      .open(TaskDetailComponent, { data: taskObj })
  }

  navigateToProjects() {
    this._router.navigate(['/projects']);
  }


  updateFunctionalityState(taskObj: Task) {
    this._taskService.getFunctionalityTasks(taskObj.functionalityId).subscribe({
      next: (res) => {
        let allIsDone = res.every((t) => { return t.state == 'DONE' });

        if (allIsDone) {
          this.setFunctionalityState(taskObj.functionalityId, 'DONE');
        } else {
          let allIsTodo = res.every((t) => { return t.state == 'TODO' });

          if (allIsTodo) {
            this.setFunctionalityState(taskObj.functionalityId, 'TODO');
          } else {
            this.setFunctionalityState(taskObj.functionalityId, 'DOING');
          }
        }
      },
      error: (err) => {

      }
    });
  }

  setFunctionalityState(functionalityId: number, state: string) {
    this._functionalityService.getFunctionality(functionalityId).subscribe({
      next: (res) => {
        res.state = state;
        this._functionalityService.updateFunctionality(functionalityId, res).subscribe({
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
