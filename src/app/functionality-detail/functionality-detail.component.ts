import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../services/project.service';
import { FunctionalityService } from '../services/functionality.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskAddEditComponent } from '../task-add-edit/task-add-edit.component';
import { TaskService } from '../services/task.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-functionality-detail',
  templateUrl: './functionality-detail.component.html',
  styleUrls: ['./functionality-detail.component.scss']
})
export class FunctionalityDetailComponent implements OnInit {
  functionalityId: string;
  functionalityObj: any;
  projectObj: any;
  displayedColumns: string[] = ['id', 'name', 'description', 'priority', 'expectedEnd', 'state', 'createdDate', 'startTime', 'endTime', 'action'];
  tasksTODO!: MatTableDataSource<any>;
  tasksDOING!: MatTableDataSource<any>;
  tasksDONE!: MatTableDataSource<any>;

  constructor(
    private _dialog: MatDialog,
    private _projectService: ProjectService,
    private _functionalityService: FunctionalityService,
    private _taskService: TaskService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.functionalityId = this._route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.getSelectedFunctionality();
    this.getFunctionalityTasksList();
  }

  getSelectedFunctionality() {
    this._functionalityService.getFunctionality(Number(this.functionalityId)).subscribe({
      next: (res) => {
        this.functionalityObj = res;
        this.getProject(res.projectId);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getProject(id: string) {
    this._projectService.getProject(Number(id)).subscribe({
      next: (res) => {
        this.projectObj = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getFunctionalityTasksList() {
    this._taskService.getFunctionalityTasks(Number(this.functionalityId)).subscribe({
      next: (res) => {
        this.tasksTODO = new MatTableDataSource(res.filter((obj) => { return obj.state === 'TODO' }));
        this.tasksDOING = new MatTableDataSource(res.filter((obj) => { return obj.state === 'DOING' }));
        this.tasksDONE = new MatTableDataSource(res.filter((obj) => { return obj.state === 'DONE' }));
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openAddTaskForm() {
    const dialogRef = this._dialog.open(TaskAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.saveTask(null, val);
        }
      },
    })
  }

  saveTask(data: any, newVal: any) {
    newVal.functionalityId = this.functionalityId;
    newVal.projectId = this.projectObj?.id ?? '';
    newVal.createdDate = new Date;
    if (data) {
      this._taskService.updateTask(data.id, newVal).subscribe({
        next: (val: any) => {
          this.getFunctionalityTasksList();
        },
        error: (err: any) => {
          console.error(err)
        }
      });
    } else {
      this._taskService.addTask(newVal).subscribe({
        next: (val: any) => {
          this.getFunctionalityTasksList();
        },
        error: (err: any) => {
          console.error(err)
        }
      });
    }
  }

  deleteTask(taskId: any) {
    this._taskService.deleteTask(taskId).subscribe({
      next: (val: any) => {
        this.getFunctionalityTasksList();
      },
      error: (err: any) => {
        console.error(err)
      }
    });
  }

  openEditTaskForm(data: any) {
    this._dialog
      .open(TaskAddEditComponent, {
        data: data
      })
      .afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.saveTask(data, val);
          }
        },
      });
  }
}
