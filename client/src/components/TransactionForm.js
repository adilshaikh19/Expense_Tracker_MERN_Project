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
import {useSelector} from "react-redux"

const InitailForm = {
        amount:0,
        description:"",
        date: new Date(),
        category_id : ""

    }


export default function TransactionForm({fetchTransaction, editTransaction}) {

    const {categories}  = useSelector((state) => state.auth.user);
    const token = Cookies.get('token')
    const [form, setForm] = useState(InitailForm)


    function handleInput(e) {
        setForm({...form, [e.target.name]:e.target.value})
    }

    function handleDate(val){
        setForm({...form, date:val})
    }

    useEffect(() => {
        if(editTransaction.amount !== undefined){
            setForm(editTransaction)
        }
    }, [editTransaction])
    

    async function handleSubmit(e) {
        e.preventDefault()
        editTransaction.amount === undefined ? create() : update();
    }

    function reload(res){
        if(res.ok){
            setForm(InitailForm)
            fetchTransaction()
        }
    }

    async function create(){
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction` , {
            method:"POST",
            body: JSON.stringify(form),
            headers:{
                'content-type':'application/json',
                "Authorization" : `Bearer ${token}`
            }
        })
        reload(res);
    }

    async function update() {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}` , {
            method:"PATCH",
            body: JSON.stringify(form),
            headers:{
                'content-type':'application/json',
                "Authorization" : `Bearer ${token}`
            }
        })
         reload(res);
    }


   function getCategoryNameById() {
    return (
      categories.find((category) => category._id === form.category_id) ?? ""
    );
  }

  return (
    <Card sx={{ minWidth: 275 ,marginTop:10}}>
      <CardContent>
        <Typography variant='h6'>
            Enter the Transaction
        </Typography>
        

        <Box component="form" onSubmit={handleSubmit} sx={{display:"flex"}}>
        
            <TextField sx={{marginRight:5}}  size="small" id="outlined-basic" label="Amount" variant="outlined" 
            onChange={handleInput} name="amount" value={form.amount}
            />
            <TextField sx={{marginRight:5}} size="small" id="outlined-basic" label="Description" variant="outlined" 
            onChange={handleInput} name="description" value={form.description}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Date"
                onChange={handleDate}
                name="date" value={form.date}
                renderInput={(params) => <TextField sx={{marginRight:5}} size="small" {...params} />}
            />
            </LocalizationProvider>

            <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, category_id: newValue._id });
            }}
            id="controllable-states-demo"
            options={categories}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Category" />
            )}
          />

            {
                editTransaction.amount !== undefined && (
                    <Button type='submit' variant="contained">Update</Button>
                )
            }
            {
                editTransaction.amount === undefined && (
                    <Button type='submit' variant="contained">Submit</Button>
                )
            }
        </Box>
      </CardContent>
    </Card>
  );
}