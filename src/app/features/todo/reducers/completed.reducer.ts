import { on, createReducer } from '@ngrx/store';
import * as actions from '../actions/list.actions';

export interface CompletedState {
  ids: string[];
}

export const initialState: CompletedState = {
  ids: []
};

export const reducer = createReducer(
  initialState,
  on(actions.todoItemCompleted, (state, action) => {
    return {
      ids: [action.item.id, ...state.ids]
    };
  }),
  on(actions.clearCompleted, () => ({ ids: [] })),
  on(actions.todosLoadedOk, (state, action) => ({ ids: action.completedIds }))
);
