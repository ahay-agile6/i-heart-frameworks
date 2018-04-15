import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DotnetCoreComponent } from './dotnet-core/dotnet-core.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'dotnet-core',
    component: DotnetCoreComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
