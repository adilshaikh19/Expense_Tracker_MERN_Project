import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import Cookies from 'js-cookie';
import {useSelector, useDispatch} from "react-redux"
import { setUser } from '../store/auth';

const InitialForm = {
  label: "",
  icon: "",
};

const icons = ["User"];

export default function CategoryForm({ editCategory}) {

    const user = useSelector((state) => state.auth.user || {});
    const dispatch = useDispatch()
    const token = Cookies.get('token')
    const [form, setForm] = useState(InitialForm)


    function handleInput(e) {
        setForm({...form, [e.target.name]:e.target.value})
    }

    function handleDate(val){
        setForm({...form, date:val})
    }

    useEffect(() => {
        if(editCategory._id !== undefined){
            setForm(editCategory)
        }
    }, [editCategory])
    

    async function handleSubmit(e) {
        e.preventDefault()
        editCategory._id === undefined ? create() : update();
    }

    function reload(res,_user){
        if(res.ok){
            
            dispatch(setUser({user : _user}))
            setForm(InitialForm)
        }
    }

    async function create(){
        const res = await fetch(`${process.env.REACT_APP_API_URL}/category` , {
            method:"POST",
            body: JSON.stringify(form),
            headers:{
                'content-type':'application/json',
                "Authorization" : `Bearer ${token}`
            }
        })
        const _user = {
                ...user,
                categories: [...user.categories, {...form}]
            }
        reload(res,_user);
    }

    async function update() {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editCategory._id}` , {
            method:"PATCH",
            body: JSON.stringify(form),
            headers:{
                'content-type':'application/json',
                "Authorization" : `Bearer ${token}`
            }
        })
        const _user = {
            ...user,
            categories: user.categories.map((cat) => cat._id === editCategory._id ? form:cat)
        }
         reload(res,_user);
    }


   function getCategoryNameById() {
    return (
      user.categories.find((category) => category._id === form.category_id) ?? ""
    );
  }

  return (
    <Card sx={{ minWidth: 275 ,marginTop:10}}>
      <CardContent>
        <Typography variant='h6'>
            Enter the Transaction
        </Typography>
        

        <Box component="form" onSubmit={handleSubmit} sx={{display:"flex"}}>
        
            <TextField sx={{marginRight:5}}  size="small" id="outlined-basic" label="Label" variant="outlined" 
            onChange={handleInput} name="label" value={form.label}
            />

            <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, icon: newValue });
            }}
            id="icons"
            options={icons}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Icon" />
            )}
          />

            {
                editCategory._id !== undefined && (
                    <Button type='submit' variant="contained">Update</Button>
                )
            }
            {
                editCategory._id === undefined && (
                    <Button type='submit' variant="contained">Submit</Button>
                )
            }
        </Box>
      </CardContent>
    </Card>
  );
}