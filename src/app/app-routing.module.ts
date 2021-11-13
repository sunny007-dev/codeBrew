import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesComponent } from './admin/properties/properties.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: 'properties', component:  PropertiesComponent}
    ]
  },
  { path: '', redirectTo: 'admin/properties', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
