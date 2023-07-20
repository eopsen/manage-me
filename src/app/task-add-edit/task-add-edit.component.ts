import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';


interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent {
  taskForm: FormGroup;

  priorities: Priority[] = [
    { value: 'low', viewValue: 'LOW' },
    { value: 'medium', viewValue: 'MEDIUM' },
    { value: 'high', viewValue: 'HIGH' },
  ];

  constructor(
    private _fb: FormBuilder,
    private _taskService: TaskService,
    private _dialogRef: MatDialogRef<TaskAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this._fb.group({
      name: '',
      description: '',
      priority: 'low',
      expectedEnd: '',
      state: 'TODO',
      projectId: '',
      functionalityId: '',
      startTime: '',
      endTime: '',
      createdDate: ''
    })
  }

  ngOnInit(): void {
    this.taskForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.taskForm.valid) {
      this._dialogRef.close(this.taskForm.value);
    }
  }
}


