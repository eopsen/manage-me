import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionalityListComponent } from './functionality-list/functionality-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { FunctionalityDetailComponent } from './functionality-detail/functionality-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
  { path: 'project/:id', component: FunctionalityListComponent },
  { path: 'functionalities', component: FunctionalityListComponent },
  { path: 'functionality/:id', component: FunctionalityDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
