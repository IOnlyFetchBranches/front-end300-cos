import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // lazy load
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(mod => mod.AdminModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
