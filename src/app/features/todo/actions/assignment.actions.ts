import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/list.reducer';
import { FilterOptions } from '../reducers/filter.reducer';

export const assignTask = createAction(
  '[todosfeature] assign task',
  props<{ name: string, task: TodoEntity }>()
);



