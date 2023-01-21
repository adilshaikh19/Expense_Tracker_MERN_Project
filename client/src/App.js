import { useState ,useEffect} from "react";
import Button from '@mui/material/Button';
import AppBar from './components/AppBar.js'
import TransactionForm from './components/TransactionForm.js'
import TransactionsList from './components/TransactionsList.js'
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "./store/auth.js";
import Cookies from 'js-cookie';
import { Navigate, redirect} from "react-router-dom";


function App() {
  
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);

  const token = Cookies.get('token')

  async function fetchUser(){
    setIsLoading(true)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    if(res.ok){
      const user = await res.json()
      dispatch(setUser(user))
    }
    setIsLoading(false)
  }


  useEffect(() => {
   fetchUser()
  }, [])


  if(isLoading){
    return <p>loading....</p>
  }
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
