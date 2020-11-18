import { CREATE_TODO, INIT_TODO } from "./Todos.store";

interface ITodo {
  title: string;
  content: string;
  priority: number;
  todos?: Todo[] | [];
  isComplete: boolean;
  createDate: Date;
  expiresDate: Date | undefined;
  isSave: boolean;
}

export interface ITodosState {
  todos: Todo[] | [];
}

export interface ICreateTodo {
  type: typeof CREATE_TODO;
  payload: {
    title: string;
    content: string;
    priority: string | number;
  };
}

export interface IInitTodo {
  type: typeof INIT_TODO;
}

export interface IsaveTodo {
  type: typeof SAVE_TODO;
  payload: {
    id: string;
  };
}

export interface ICreateReplyTodo {
  type: typeof CREATE_REPLY_TODO;
  payload: {
    parentId: string;
  };
}

export type TodosActionTypes = ICreateTodo | IsaveTodo | IInitTodo;
