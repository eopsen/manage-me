import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FunctionalityService } from '../services/functionality.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-functionality-add-edit',
  templateUrl: './functionality-add-edit.component.html',
  styleUrls: ['./functionality-add-edit.component.scss']
})
export class FunctionalityAddEditComponent {
  functionalityForm: FormGroup;

  priorities: Priority[] = [
    { value: 'low', viewValue: 'Low' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'high', viewValue: 'High' },
  ];

  constructor(
    private _fb: FormBuilder,
    private _functionalityService: FunctionalityService,
    private _dialogRef: MatDialogRef<FunctionalityAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.functionalityForm = this._fb.group({
      name: '',
      description: '',
      priority: 'low',
      owner: 'John doe',
      state: 'TODO',
      projectId: '123'
    })
  }

  ngOnInit(): void {
    this.functionalityForm.patchValue(this.data);
  }
  onFormSubmit() {

    if (this.functionalityForm.valid) {
      this._dialogRef.close(this.functionalityForm.value);


    }
  }
}
