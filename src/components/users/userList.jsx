import  {LIST_USERS_QUERY} from '../../graphql/userquery';
import { useQuery} from '@apollo/client';
import {  NavLink } from "react-router-dom";


export default function userList() { //function
    const { loading, error, data } = useQuery(LIST_USERS_QUERY, {
        variables: { active: true }, 
      });
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
    <h2>Total Users: {data.listUsers.paginatorInfo.total}</h2>
    <ul>
      {data.listUsers.data.map((user) => (
        <li key={user.id}>
         
           <NavLink  to={`/user/${user.id}`} > UserName : {user.username} </NavLink> 
          <p>ID: {user.id}</p>
        </li>
      ))}
    </ul>
  </div>
  );
}
