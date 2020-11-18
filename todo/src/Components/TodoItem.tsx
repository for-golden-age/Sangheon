import { WriteForm } from "Container/TodoList";
// import { totalmem } from "os";
import React from "react";
// import { saveTodo } from "Store/Todos/Todos.store";

interface ITodoItem {
  form: WriteForm;
  onchange: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => any;
  isSave: boolean;
  saveTodo: (payload: { id: string }) => void;
  [key: string]: any;
}

export enum Priority {
  "Highest",
  "High",
  "Medium",
  "Low",
  "Lowest",
}

export const PRIORITY_NAME_MAP: { [key in Priority]: string } = {
  [Priority.Highest]: "매우 높음",
  [Priority.High]: "높음",
  [Priority.Medium]: "보통",
  [Priority.Low]: "낮음",
  [Priority.Lowest]: "매우 낮음",
};

export function getIsValidEnumValue(enumObject: any, value: number | string) {
  return Object.keys(enumObject)
    .filter((key) => isNaN(Number(key)))
    .some((key) => enumObject[key] === value);
}

const TodoItem: React.FC<ITodoItem> = ({ form, onchange, title, content, priority, isSave, id, saveTodo, createReplyTodo }) => {
  if (isSave) {
    return (
      <div className="TodoItem">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => onchange(e as any)}
          placeholder="제목을 입력하세요"
          readOnly={true}
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => onchange(e as any)}
          placeholder="내용을 입력하세요"
          readOnly={true}
        ></textarea>
        <select name="priority" defaultValue={Priority[priority]} onChange={(e) => onchange(e as any)} disabled={true}>
          {Object.keys(PRIORITY_NAME_MAP).map((item: any) => {
            return (
              <option value={Priority[item]} key={Priority[item]}>
                {PRIORITY_NAME_MAP[item as never]}
              </option>
            );
          })}
        </select>
        <button onClick={() => createReplyTodo({ parentId: id })}>추가</button>
      </div>
    );
  } else {
    const { title, content, priority } = form;

    return (
      <div className="TodoItem">
        <input type="text" name="title" value={title} onChange={(e) => onchange(e as any)} placeholder="제목을 입력하세요" />
        <textarea name="content" value={content} onChange={(e) => onchange(e as any)} placeholder="내용을 입력하세요"></textarea>
        <select name="priority" value={Priority[priority]} onChange={(e) => onchange(e as any)}>
          {Object.keys(PRIORITY_NAME_MAP).map((item: any) => {
            return (
              <option value={Priority[item]} key={Priority[item]}>
                {PRIORITY_NAME_MAP[item as never]}
              </option>
            );
          })}
        </select>

        <button
          onClick={() => {
            saveTodo({ id });
          }}
        >
          저장
        </button>
      </div>
    );
  }
};

export default TodoItem;
