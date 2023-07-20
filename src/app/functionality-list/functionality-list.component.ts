import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionalityService } from '../services/functionality.service';
import { ProjectService } from '../services/project.service';
import { FunctionalityAddEditComponent } from '../functionality-add-edit/functionality-add-edit.component';

@Component({
  selector: 'app-functionality-list',
  templateUrl: './functionality-list.component.html',
  styleUrls: ['./functionality-list.component.scss']
})
export class FunctionalityListComponent implements OnInit {
  projectId: string;
  project: any;
  displayedColumns: string[] = ['id', 'name', 'description', 'priority', 'owner', 'state', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _dialog: MatDialog,
    private _projectService: ProjectService,
    private _functionalityService: FunctionalityService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.projectId = this._route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.getFunctionalitiesList();
    this.getSelectedProject();
  }

  openAddFunctionalityForm() {
    const dialogRef = this._dialog.open(FunctionalityAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.saveFunctionality(null, val);
        }
      },
    })
  }

  getFunctionalitiesList() {
    this._functionalityService.getFunctionalitiesList(this.projectId).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteFunctionality(id: number) {
    this._functionalityService.deleteFunctionality(id).subscribe({
      next: (res) => {
        this.getFunctionalitiesList();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openEditFunctionalityForm(data: any) {
    this._dialog
      .open(FunctionalityAddEditComponent, {
        data: data
      })
      .afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.saveFunctionality(data, val);
          }
        },
      });
  }

  navigateToTasks(row: any) {
    this._router.navigate([`/functionality/${row.id}`]);
  }

  getSelectedProject() {
    this._projectService.getProject(Number(this.projectId)).subscribe({
      next: (res) => {
        this.project = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  saveFunctionality(data: any, newVal: any) {
    newVal.projectId = this.projectId;
    if (data) {//check if update
      this._functionalityService.updateFunctionality(data.id, newVal).subscribe({
        next: (val: any) => {
          this.getFunctionalitiesList();
        },
        error: (err: any) => {
          console.error(err)
        }
      });
    } else {
      this._functionalityService.addFunctionality(newVal).subscribe({
        next: (val: any) => {
          this.getFunctionalitiesList();
        },
        error: (err: any) => {
          console.error(err)
        }
      });
    }
  }

  navigateToProjects() {
    this._router.navigate(['/projects']);
  }
}
