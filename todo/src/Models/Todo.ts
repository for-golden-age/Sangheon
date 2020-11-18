import { ITodo } from "Store/Todos";

export default class Todo implements ITodo {
  static index: number = 0;
  key: string;
  todos: ITodo[];
  isComplete: boolean;
  createDate: Date;
  expiresDate: Date | undefined;
  isSave: boolean;
  constructor(public title: string, public content: string, public priority: number = 0) {
    this.createDate = new Date();
    this.expiresDate = undefined;
    this.todos = [];
    this.isComplete = false;
    this.isSave = false;
    this.key = `${Todo.index++}-${new Date().toString()}`;
  }
}
