import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './components/entry/entry.component';
import { ListComponent } from './components/list/list.component';
import { StoreModule } from '@ngrx/store';
import { reducers, featureName } from './reducers';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { EffectsModule } from '@ngrx/effects';
import { FilterEffects } from './effects/filter.effects';
import { HttpClientModule } from '@angular/common/http';
import { AppEffects } from './effects/app.effects';
import { ListEffects } from './effects/list.effects';

const routes: Routes = [
  {
    path: 'todo-list',
    component: TodoComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'entry', component: EntryComponent },
      { path: '**', redirectTo: 'list' }
    ]
  },

];

@NgModule({
  declarations: [TodoComponent, EntryComponent, ListComponent, FilterBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([FilterEffects, AppEffects, ListEffects]),
    HttpClientModule,
  ]
})
export class TodoModule { }
