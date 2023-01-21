import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/auth.js';



function ButtonAppBar() {

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch();

  function _logout() {
    Cookies.remove("token")
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className='text-white'>
            Expense Tracker
            </Link>
          </Typography>
           <Link to ="/category"className='text-white'>
                <Button color="inherit">category</Button>
            </Link>

          {
            isAuthenticated && (
              <Link to ="/login"className='text-white' onClick={_logout}>
                <Button color="inherit">Logout</Button>
              </Link>
            )
          }
          {
            !isAuthenticated && <>
              <Link to ="/login"className='text-white'>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to ="/register"className='text-white'>
                <Button color="inherit">SignUp</Button>
              </Link>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar