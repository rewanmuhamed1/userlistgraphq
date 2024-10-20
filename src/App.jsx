import { useContext , useEffect } from 'react'
import './App.css'
import { Route, Routes,Navigate } from 'react-router-dom'
import Login from './components/login'
import UserList from './components/users/userList'
import { TokenContext } from './context';
import User from './components/users/user'



function App() {
 const { userToken, setUserToken } = useContext(TokenContext);
 //const [getuserid, setGetuserid] = useState(localStorage.getItem('usertoken'));
  //const context = useContext(TokenContext);
//  let { userToken } = context;
const getuserid = localStorage.getItem('usertoken');
  // const userTokenContext = createContext(usertoken);
  
 
  console.log('app userToken', userToken, '  context', userToken);
  return (
    <>

      <Routes >
        {
          userToken ?
            <>

              <Route path="/" element={<Navigate to="/userlist" />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path="/user/:userid" element={<User />} />
            </>

            :
            <Route path="/" element={<Login />} />
        }




      </Routes >
    </>
  )
}

export default App
