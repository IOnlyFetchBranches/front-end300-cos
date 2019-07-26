import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/list.reducer';
import { FilterOptions } from '../reducers/filter.reducer';

export const loadData = createAction(
  '[todosfeature] get todos data'
);



