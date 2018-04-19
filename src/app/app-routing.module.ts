import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DotnetCoreComponent } from './dotnet-core/dotnet-core.component';
import { AuthComponent } from './auth/auth.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'dotnet-core',
    component: DotnetCoreComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
