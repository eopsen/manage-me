import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectAddEditComponent } from './project-add-edit/project-add-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { FunctionalityListComponent } from './functionality-list/functionality-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { FunctionalityAddEditComponent } from './functionality-add-edit/functionality-add-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { FunctionalityDetailComponent } from './functionality-detail/functionality-detail.component';
import { MatCardModule } from '@angular/material/card';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskKanbanComponent } from './task-kanban/task-kanban.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import TaskDetailComponent from './task-detail/task-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    ProjectAddEditComponent,
    FunctionalityListComponent,
    ProjectListComponent,
    FunctionalityAddEditComponent,
    FunctionalityDetailComponent,
    TaskAddEditComponent,
    TaskKanbanComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
