import { on, createReducer } from '@ngrx/store';
import * as actions from '../actions/filters.actions';
import { tassign } from 'tassign';

export type FilterOptions = 'all' | 'incomplete' | 'complete';

export interface FilterState {
  listFilter: FilterOptions;
  customFilter: string;
}
export const initialState: FilterState = {
  listFilter: 'all',
  customFilter: null
};

export const reducer = createReducer(
  initialState,
  on(actions.setFilter, (state, action) => tassign(state, { listFilter: action.filterString })),
  on(actions.filterWithString, (state, action) => tassign(state, { customFilter: action.userInput })));
