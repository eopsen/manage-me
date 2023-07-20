import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../services/project.service';
import { FunctionalityService } from '../services/functionality.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-functionality-detail',
  templateUrl: './functionality-detail.component.html',
  styleUrls: ['./functionality-detail.component.scss']
})
export class FunctionalityDetailComponent implements OnInit {
  functionalityId: string;
  functionalityObj: any;
  projectObj: any;

  constructor(
    private _dialog: MatDialog,
    private _projectService: ProjectService,
    private _functionalityService: FunctionalityService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.functionalityId = this._route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.getSelectedFunctionality();
    this.getFunctionalityTasksList();
  }

  getSelectedFunctionality() {
    this._functionalityService.getFunctionality(this.functionalityId).subscribe({
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

  }
}
