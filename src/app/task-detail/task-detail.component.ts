import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task.model';
import { ProjectService } from '../services/project.service';
import { FunctionalityService } from '../services/functionality.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export default class TaskDetailComponent implements OnInit {
  taskObj: Task;
  projectObj: any;
  functionalityObj: any;

  constructor(
    private _dialogRef: MatDialogRef<TaskDetailComponent>,
    private _projectService: ProjectService,
    private _functionalityService: FunctionalityService,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
    this.taskObj = data;
  }

  ngOnInit(): void {
    this._projectService.getProject(this.taskObj.projectId).subscribe({
      next: (res) => {
        this.projectObj = res;
      },
      error: (err) => {

      }
    });

    this._functionalityService.getFunctionality(this.taskObj.functionalityId).subscribe({
      next: (res) => {
        this.functionalityObj = res;
      },
      error: (err) => {

      }
    });
  }
}
