import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/auth';
import CategoryForm from '../components/CategoryForm';
import { useState } from 'react';

export default function Category() {

  const token = Cookies.get('token')
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const [editCategory, setEditCategory] = useState({})

  function setEdit(category){
    setEditCategory(category)
  }



  function formatDate(date){
    return dayjs(date).format("DD-MMM, YYYY")
  }


   async function remove(id) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const _user = {
        ...user,
        categories: user.categories.filter((cat) => cat._id != id),
      };
      dispatch(setUser({ user: _user }));
    }
  }


  return (
    <>
    <CategoryForm editCategory={editCategory} />


      <Typography variant='h5' sx={{marginTop:10}}>List of Categories</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.label}
                </TableCell>
                <TableCell align="center">{row.icon}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" component="label" 
                  onClick={() => setEdit(row)}
                  >
                    <ModeEditIcon />
                  </IconButton>

                  <IconButton color="danger" component="label"
                   onClick={() => remove(row._id)}
                   >
                    <DeleteIcon sx={{marginLeft:1}}/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}