import { TodoEntity } from '../reducers/list.reducer';

export interface Assignment {
  assignedTo: string;
  task: TodoEntity;
}
