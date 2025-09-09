import "./App.css";

import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

const GET_USERS = gql`
  query GetUsers {
    getUser {
      id
      name
      age
      isMarried
    }
  }
`;

const GET_USERS_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

function App() {
  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);

  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USERS_BY_ID, { variables: { id: "2" } });

  if (getUsersLoading) return <p> loading ...</p>;

  if (getUsersError) return <p> {getUsersError.message}</p>;

  console.log(getUserByIdData);

  return (
    <>
      {getUserByIdLoading ? (
        <p> loading ...</p>
      ) : getUserByIdError ? (
        <p>{getUserByIdError.message}</p>
      ) : (
        <>
          <h1>chosen user</h1>
          <p>name: {getUserByIdData.getUserById.name}</p>
          <p>age: {getUserByIdData.getUserById.age}</p>
        </>
      )}

      <h1> Users</h1>
      <hr />
      {getUsersData.getUser.map((user) => (
        <div key={user.id}>
          <p> name: {user.name}</p>
          <p> age: {user.age}</p>
          <p> is user married or no? {user.isMarried ? "Yes" : "No"}</p>
          <hr />
        </div>
      ))}
    </>
  );
}

export default App;
