/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { createImportSpecifier } from "typescript";
import { find } from "utils/utils";
import "./TodoContainer.scss";

interface ITodo {
  title: string;
  content: string;
  priority: string;
  id: number;
  child: Array<ITodo> | [];
}

const TodoContainer: React.FC = () => {
  const [depth, setDepth] = React.useState(1);
  const initialForm = { title: "", content: "", priority: "", id: 0 };
  const [isEdit, setEdit] = React.useState(false);
  const [isView, setView] = React.useState(false);
  const [todos, setTodos]: [ITodo[], any] = React.useState([
    {
      content: "1",
      id: 1,
      priority: "1",
      title: "1번째 제목",
      child: [
        {
          content: "1-1",
          id: 3,
          priority: "1",
          title: "3번째 제목",
          child: [
            {
              content: "1-1-1",
              id: 5,
              priority: "1",
              title: "4번째 제목",
              child: [{ content: "1-1-1-1", id: 7, priority: "1", title: "4번째 제목", child: [] }],
            },
          ],
        },
        {
          content: "1-2",
          id: 4,
          priority: "1",
          title: "3번째 제목",
          child: [
            {
              content: "1-2-1",
              id: 6,
              priority: "1",
              title: "4번째 제목",
              child: [{ content: "1-2-1-1", id: 8, priority: "1", title: "4번째 제목", child: [] }],
            },
          ],
        },
      ],
    },
    { content: "내용2", id: 2, priority: "3", title: "제목2", child: [] },
  ]);
  const [todo, setTodo] = React.useState(initialForm);
  const [index, setIndex] = React.useState(2);
  const { title, content, priority, id } = todo;

  const onChange = (e: any) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const createTodo = (e: any) => {
    e.preventDefault();
    setTodos([...todos, { ...todo, id: index + 1 }]);
    setIndex(index + 1);
    setTodo(initialForm);
    setView(false);
  };

  const createChildTodo = (e: any) => {};

  const updateTodo = (e: any) => {
    e.preventDefault();
    setTodos(todos.map((item) => (item.id === id ? { ...item, title, content, priority } : item)));
    setEdit(false);
    setTodo(initialForm);
    setView(false);
  };

  const editTodo = (id: any) => {
    const res: any = find(todos, id);

    setEdit(true);
    setTodo(res);
    setView(true);
  };

  const removeTodo = (obj: any, id: number) => {
    setTodos(obj.filter((item: any) => item.id !== id));
    // obj.map((item: any) => (item.child.length > 0 ? removeTodo(item.child, id) : setTodos(obj.filter((item: any) => item.id !== id))));
  };

  const subTodo = (obj: any) => {
    return obj.map((item: any) => {
      return (
        <React.Fragment key={item.id}>
          <li>
            <p className="title">제목: {item.title}</p>
            <p className="content">내용: {item.content}</p>
            <p className="priority">우선순위: {item.priority}</p>
            <button onClick={(e) => editTodo(item.id)}>수정</button>
            <button style={{ marginLeft: 8 }} onClick={() => removeTodo(todos, item.id)}>
              삭제
            </button>
            <button style={{ marginLeft: 8 }} onClick={(e) => createChildTodo(e)}>
              하위 할일 생성
            </button>
          </li>
          {item.child.length > 0 && <ul className={`todo-list sub`}>{item.child.length > 0 && subTodo(item.child)}</ul>}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="TodoContainer">
      <div className="head">
        <h1>Todo List</h1>
        <button className="create-button" onClick={() => setView(true)}>
          생성
        </button>
      </div>
      <ul className="todo-list 1">{subTodo(todos)}</ul>
      {isView && (
        <form className={"TodoContainer--form"}>
          <h1>{isEdit ? "수정" : "생성"}</h1>
          <input type="text" name="title" placeholder="제목을 입력하세요." onChange={(e) => onChange(e)} value={title} />
          <textarea name="content" onChange={(e) => onChange(e)} value={content}></textarea>
          <select name="priority" defaultValue={priority} onChange={(e) => onChange(e)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button onClick={(e) => (isEdit ? updateTodo(e) : createTodo(e))}>{isEdit ? "수정" : "생성"}</button>
        </form>
      )}
    </div>
  );
};

export default TodoContainer;
