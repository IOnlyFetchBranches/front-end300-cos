import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as listActions from '../actions/list.actions';


export interface UiHintsState {
  listLoaded: boolean;
}

const initialState: UiHintsState = {
  listLoaded: false,
};

const myReducer = createReducer(
  initialState,
  on(listActions.loadTodos, (state) => ({ ...state, listLoaded: false })),
  on(listActions.todosLoadedOk, (state) => ({ ...state, listLoaded: true })),
);

export function reducer(state: UiHintsState = initialState, action): UiHintsState {
  return myReducer(state, action);
}
