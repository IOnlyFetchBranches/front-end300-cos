import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/list.reducer';
import { FilterOptions } from '../reducers/filter.reducer';

export const addPerson = createAction(
  '[todosfeature] add person',
  props<{ name: string }>()
);



