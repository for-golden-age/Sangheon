/* eslint-disable @typescript-eslint/no-unused-vars */
import Todo from "Models/Todo";
import { createReducer } from "typesafe-actions";
import { find } from "utils/utils";
import { ITodosState, ICreateTodo, TodosActionTypes, IsaveTodo, IInitTodo, ICreateReplyTodo } from "./index.d";

export const CREATE_TODO = "todos/CREATE_TODO";
export const READ_TODO = "todos/READ_TODO";
export const UPDATE_TODO = "todos/UPDATE_TODO";
export const DELETE_TODO = "todos/REMOVE_TODO";
export const INIT_TODO = "todos/INIT_TODO";
export const SAVE_TODO = "todos/SAVE_TODO";
export const CREATE_REPLY_TODO = "todos/CREATE_REPLY_TODO";

const initialState: ITodosState = {
  todos: [],
};

const todos = createReducer<ITodosState, any>(initialState, {
  [CREATE_TODO]: (state: ITodosState, action: ICreateTodo) => {
    const { content, title } = action.payload;
    return { ...state, todos: [...state.todos, new Todo(title, content)] };
  },
  [SAVE_TODO]: (state: ITodosState, action: any) => {
    const { id } = action.payload;

    const findObj = find(state.todos, id);

    return {
      ...state,
      todos: (state.todos as Todo[]).map((item: any) =>
        item.key === findObj.key
          ? {
              ...item,
              isSave: true,
              title: action.payload.title,
              content: action.payload.content,
              priority: action.payload.priority,
            }
          : item
      ),
    };
  },
  [CREATE_REPLY_TODO]: (state: ITodosState, action: any) => {
    const { parentId } = action.payload;
    console.log(parentId);
    return { ...state };
  },
  [INIT_TODO]: (state: ITodosState, action: IInitTodo) => {
    return { ...state, todos: [] };
  },
});

export const createTodo = (payload: { title: string; content: string; priority: string | number }): ICreateTodo => ({
  type: CREATE_TODO,
  payload,
});

export const initTodo = () => ({
  type: INIT_TODO,
});

export const saveTodo = (payload: { id: string; title: string; content: string }): IsaveTodo => ({
  type: SAVE_TODO,
  payload,
});

export const createReplyTodo = (payload: { parentId: string }): ICreateReplyTodo => ({
  type: CREATE_REPLY_TODO,
  payload,
});

export default todos;
