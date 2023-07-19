import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.scss']
})
export class ProjectAddEditComponent implements OnInit {
  projectForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _projectService: ProjectService,
    private _dialogRef: MatDialogRef<ProjectAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectForm = this._fb.group({
      name: '',
      description: ''
    })
  }

  ngOnInit(): void {
    this.projectForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.projectForm.valid) {
      if (this.data) {
        this._projectService.updateProject(this.data.id, this.projectForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        });
      } else {

        this._projectService.addProject(this.projectForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        });
      }
    }
  }
}
