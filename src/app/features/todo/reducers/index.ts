export const featureName = 'todosFeature';
import * as fromList from './list.reducer';
import * as fromCompleted from './completed.reducer';
import * as fromFilter from './filter.reducer';
import * as fromUiHints from './ui-hints.reducer';
import * as fromPeople from './people.reducer';
import * as fromAssignments from './assignments.reducer';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { CompileNgModuleSummary } from '@angular/compiler';
import { ListItemModel } from '../models';
export interface TodosState {
  list: fromList.TodoListState;
  completed: fromCompleted.CompletedState;
  filter: fromFilter.FilterState;
  uiHints: fromUiHints.UiHintsState;
  people: fromPeople.PeopleState;
  assignments: fromAssignments.AssignmentsState;
}

export const reducers: ActionReducerMap<TodosState> = {
  list: fromList.reducer,
  completed: fromCompleted.reducer,
  filter: fromFilter.reducer,
  uiHints: fromUiHints.reducer,
  people: fromPeople.reducer,
  assignments: fromAssignments.reducer,
};

// Convention to put Selectors here (in the index file for reducers)
// 1 Create feature Selector

// 2 Create a Selector for each branch of the feature
// 3 Any helpers?

// 4 Exported Selectors for the components


const selectTodosFeatures = createFeatureSelector<TodosState>(featureName);
// If you are on that feature, from that get the list
const selectListBranch = createSelector(selectTodosFeatures, f => f.list);
const selectCompletedBranch = createSelector(selectTodosFeatures, f => f.completed);
const selectFilterBranch = createSelector(selectTodosFeatures, f => f.filter);
const selectUiHintsBranch = createSelector(selectTodosFeatures, f => f.uiHints);
const selectPeopleBranch = createSelector(selectTodosFeatures, f => f.people);
const selectAssignmentBranch = createSelector(selectTodosFeatures, f => f.assignments);

export const selectAllPeople = createSelector(selectPeopleBranch, f => f.members);
export const selectAllAssignments = createSelector(selectAssignmentBranch, f => f.assignments);




const { selectAll: selectAllTodoEntity } = fromList.adapter.getSelectors(selectListBranch);

export const selectCompletedIds = createSelector(selectCompletedBranch, b => b.ids);


export const selectFeatureLoaded = createSelector(selectUiHintsBranch, (ui) => ui.listLoaded);

export const selectCurrentFilter = createSelector(selectFilterBranch, f => f.listFilter);
export const selectCustomFilter = createSelector(selectFilterBranch, f => f.customFilter);

export const selectUnfilteredTodoList = createSelector(
  selectAllTodoEntity,
  selectCompletedIds,
  (todos, completed) => todos.map(todo => {
    return {
      id: todo.id,
      description: todo.description,
      completed: completed.some(id => id === todo.id),
      isTemp: todo.id.startsWith('F'),
    } as ListItemModel;
  }));

export const selectButtonFilteredList = createSelector(selectUnfilteredTodoList, selectCurrentFilter,
  (todos, filterString) => {
    switch (filterString) {
      case 'all':
        return todos;
      case 'complete':
        return todos.filter((t) => t.completed);
      case 'incomplete':
        return todos.filter((t) => !t.completed);
    }
  });

export const selectTodoList = createSelector(selectButtonFilteredList, selectCustomFilter,
  (todos, filter) => {
    if (filter) {
      return todos.filter((todo) => todo.description.toLowerCase().includes(filter));
    } else {
      return todos;
    }
  });
export const selectCompletedAssignments = createSelector(selectCompletedIds, selectAllAssignments,
  (completedIds, assignments) => {
    return assignments.filter(a => completedIds.includes(a.task.id));
  });

export const selectAllUnassigned = createSelector(selectAllTodoEntity, selectAllAssignments,
  (todos, assignments) => {
    if (assignments.length === 0) {
      return todos;
    }
    const assignIds = assignments.map((a) => a.task);
    return todos.filter(
      (todo) => assignIds.includes(todo.id)
    );
  });




