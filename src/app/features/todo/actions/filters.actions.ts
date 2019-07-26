import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/list.reducer';
import { FilterOptions } from '../reducers/filter.reducer';

export const setFilter = createAction(
  '[todosfeature] set Filter',
  props<{ filterString: FilterOptions }>()
);

export const filterWithString = createAction(
  '[todosfeature] user Filter',
  props<{ userInput: string }>()
);

export const loadFilter = createAction(
  '[todos feature] load filters'
);


