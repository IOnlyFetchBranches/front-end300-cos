import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListItemModel } from '../../models';
import { Observable, Subscription } from 'rxjs';
import { TodosState, selectTodoList, selectCurrentFilter } from '../../reducers';
import { Store } from '@ngrx/store';
import { todoItemCompleted, clearCompleted } from '../../actions/list.actions';
import { TodoEntity } from '../../reducers/list.reducer';
import { FilterOptions } from '../../reducers/filter.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  $models: Observable<ListItemModel[]>;
  $filter: Observable<FilterOptions>;
  completedItems: ListItemModel[];
  subscription: Subscription;

  constructor(private store: Store<TodosState>) { }

  ngOnInit() {
    this.$models = this.store.select(selectTodoList);
    this.$filter = this.store.select(selectCurrentFilter);

    this.subscription = this.$models.subscribe(items => this.completedItems = items.filter(i => i.completed));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  markComplete(item: TodoEntity) {
    this.store.dispatch(todoItemCompleted({ item }));
  }

  removeCompleted() {
    console.log(this.completedItems);
    this.store.dispatch(clearCompleted({ items: this.completedItems }));
  }

}
