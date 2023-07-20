import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectAddEditComponent } from '../project-add-edit/project-add-edit.component';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private _dialog: MatDialog, private _projectService: ProjectService, private _router: Router) { }

  ngOnInit(): void {
    this.getProjectsList();
  }

  openAddProjectForm() {
    const dialogRef = this._dialog.open(ProjectAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProjectsList();
        }
      },
    })
  }

  getProjectsList() {
    this._projectService.getProjectsList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteProject(id: number) {
    this._projectService.deleteProject(id).subscribe({
      next: (res) => {
        this.getProjectsList();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openEditProjectForm(data: any) {
    this._dialog
      .open(ProjectAddEditComponent, { data: data })
      .afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getProjectsList();
          }
        },
      });
  }

  navigateToFunctionality(row: any) {
    this._router.navigate([`/project/${row.id}`]);
  }

  navigateToTasks(row: any) {
    this._router.navigate([`/tasks/${row.id}`]);
  }
}
