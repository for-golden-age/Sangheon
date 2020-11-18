/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IReqGetUsers, IUsersState } from "./Store/Users";
import { connect } from "react-redux";
import { reqGetUsers } from "Store/Users/Users.store";
import { User } from "Models/users";
import TodoContainer from "Container/TodoContainer/TodoContainer";

interface IApp {
  reqGetUsers: () => IReqGetUsers;
  users: User[];
}

function App({ reqGetUsers, users }: IApp) {
  React.useEffect(() => {
    reqGetUsers();
  }, []);

  return (
    <div className="App">
      {
        <TodoContainer />
        /* <TodoList />
      <Counter /> */
      }
    </div>
  );
}

export default connect(
  ({ Users }: { Users: IUsersState }) => ({
    users: Users.userList,
  }),
  {
    reqGetUsers,
  }
)(App);
