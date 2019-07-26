import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodosState, selectCurrentFilter } from '../../reducers';
import { FilterOptions } from '../../reducers/filter.reducer';
import { setFilter, filterWithString } from '../../actions/filters.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  constructor(private store: Store<TodosState>) { }

  $filter: Observable<FilterOptions>;

  ngOnInit() {
    this.$filter = this.store.select(selectCurrentFilter);
  }
  setFilter(filterString: FilterOptions) {
    this.store.dispatch(setFilter({ filterString }));
  }

  filterList(userInput: string) {
    this.store.dispatch(filterWithString({ userInput: userInput.toLowerCase() }));
  }
}
