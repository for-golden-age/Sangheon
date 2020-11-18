/* eslint-disable @typescript-eslint/no-unused-vars */
import TodoItem from "Components/TodoItem";
import Todo from "Models/Todo";
import React from "react";
import { connect } from "react-redux";
import { ITodo, ITodosState } from "Store/Todos";
import { createReplyTodo, createTodo, initTodo, saveTodo } from "Store/Todos/Todos.store";

interface ITodoList {
  todos?: Todo[];
  createTodo: (payload: Pick<ITodo, "title" | "content" | "priority">) => void;
  initTodo: () => void;
  saveTodo: (payload: { id: string; title: string; content: string; priority: string | number }) => void;
  [key: string]: any;
}

export interface WriteForm {
  title: string;
  content: string;
  priority: number;
}

const TodoList: React.FC<ITodoList> = ({ todos, createTodo, initTodo, saveTodo, createReplyTodo }) => {
  const [form, setForm]: [WriteForm, any] = React.useState({
    title: "",
    content: "",
    priority: 2,
  });
  const { title, content, priority } = form;

  const onchange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const saveTodoFn = ({ id }: { id: string }) => {
    saveTodo({ id, title, content, priority });
    setForm({ title: "", content: "", priority: "" });
  };

  React.useEffect(() => {
    // console.log(form);
  }, [form]);

  const onClick = () => {
    createTodo({ title, content, priority });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={() => onClick()}>생성</button>
      <button onClick={() => initTodo()}>초기화</button>

      {todos?.map((item) => (
        <TodoItem
          form={form}
          onchange={onchange}
          key={item.key}
          isSave={item.isSave}
          title={item.title}
          content={item.content}
          priority={item.priority}
          id={item.key}
          saveTodo={saveTodoFn}
          createReplyTodo={createReplyTodo}
        />
      ))}
    </div>
  );
};

export default connect(
  ({ Todo }: { Todo: ITodosState }) => ({
    todos: Todo.todos,
  }),
  {
    createTodo,
    initTodo,
    saveTodo,
    createReplyTodo,
  }
)(TodoList);
