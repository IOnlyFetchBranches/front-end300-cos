import { Component, OnInit } from '@angular/core';
import { TodosState } from '../../reducers';
import { Store } from '@ngrx/store';
import { addTodoItem } from '../../actions/list.actions';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor(private store: Store<TodosState>) { }

  ngOnInit() {
  }

  add(input: HTMLInputElement) {
    const description = input.value;
    this.store.dispatch(addTodoItem(description));
    console.log(description);
    input.value = '';
    input.focus();
  }

}
