import { Component, OnInit } from '@angular/core';
import { addPerson } from '../../actions/people.actions';
import { Store } from '@ngrx/store';
import { TodosState, selectAllUnassigned, selectAllAssignments, selectAllPeople, selectCompletedAssignments } from '../../reducers';
import { Observable, Subscription } from 'rxjs';
import { TodoEntity } from '../../reducers/list.reducer';
import { Assignment } from '../../models/assignment.model';
import { Person } from '../../models/person.model';
import { map, filter } from 'rxjs/operators';
import * as assignActions from '../../actions/assignment.actions';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  /*
  my deepest
  sincerest
  apologies for use of the dollar sign as a prefix
  Hope it doesn't *cost* ya too much time
  */
  $unassigned: Observable<TodoEntity[]>;
  $assigned: Observable<Assignment[]>;
  $completed: Observable<Assignment[]>;
  $peoples: Observable<Person[]>;

  // this feels hacky
  taskSelections = {};

  constructor(private store: Store<TodosState>) { }


  ngOnInit() {
    this.$unassigned = this.store.select(selectAllUnassigned);
    this.$assigned = this.store.select(selectAllAssignments);
    this.$peoples = this.store.select(selectAllPeople);
    this.$completed = this.store.select(selectCompletedAssignments);

  }
  add(input: HTMLInputElement) {
    const name = input.value;
    this.store.dispatch(addPerson({ name }));
    console.log(name);
    input.value = '';
    input.focus();
  }

  selectOption(assignee: string, input: string) {
    const selId = input;
    console.log('Selected ' + selId);
    const sub = this.$unassigned.pipe(
      map((x) => x.find(y => y.id === selId)),
    ).subscribe((x) => this.taskSelections[`${assignee}`] = x);
    sub.unsubscribe();
  }
  assignTask(assignee: string) {
    if (!this.taskSelections.hasOwnProperty(assignee)) {
      console.warn('no selection for ' + assignee + ' ' + Object.keys(this.taskSelections));
      return;
    }
    this.store.dispatch(
      assignActions.assignTask({ name: assignee, task: this.taskSelections[assignee] })
    );
    delete this.taskSelections[assignee];
  }

  getTasksForPerson(name: string): Observable<Assignment[]> {
    return this.$assigned.pipe(
      map((a) => a.filter(b => b.assignedTo === name)),
    );
  }

  getTotalTasksForPerson(name: string): Observable<number> {
    return this.$assigned.pipe(
      map((a) => a.filter(b => b.assignedTo === name)),
      map(a => a.length), // pipes r rockin!
    );
  }
  getTotalCompletedTasksForPerson(name: string): Observable<number> {
    return this.$completed.pipe(
      map((a) => a.filter(b => b.assignedTo === name)),
      map(a => a.length),
    );
  }





}
