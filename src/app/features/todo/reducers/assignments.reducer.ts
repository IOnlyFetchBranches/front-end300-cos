import { on, createReducer } from '@ngrx/store';
import * as actions from '../actions/assignment.actions';
import { Assignment } from '../models/assignment.model';

export interface AssignmentsState {
  assignments: Assignment[];
}

export const initialState: AssignmentsState = {
  assignments: [],
};

const myReducer = createReducer(
  initialState,
  on(actions.assignTask, (state, action) => ({ assignments: [...state.assignments, { assignedTo: action.name, task: action.task }] }))
);

export function reducer(state: AssignmentsState = initialState, action): AssignmentsState {
  return myReducer(state, action);
}
