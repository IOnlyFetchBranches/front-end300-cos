import { on, createReducer } from '@ngrx/store';
import * as actions from '../actions/people.actions';
import { Person } from '../models/person.model';

export interface PeopleState {
  members: Person[];
}

export const initialState: PeopleState = {
  members: [],
};

const myReducer = createReducer(
  initialState,
  on(actions.addPerson, (state, action) => ({ members: [{ name: action.name }, ...state.members] }))
);

export function reducer(state = initialState, action): PeopleState {
  return myReducer(state, action);
}
