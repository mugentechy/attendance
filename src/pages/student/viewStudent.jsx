import { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import {  CardActions } from '@mui/material';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { getStudentsAsync,createStudentAsync } from "../../features/student/registerActions";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast";
import { getStreamsAsync } from "../../features/classroom/registerActions";




function ViewSudents({ user }) {

  const { student } = useSelector((state) => state.student);
    const dispatch = useDispatch();
    let navigate = useNavigate();
  const { register, handleSubmit } = useForm();


  const [open, setOpen] = useState(false);
const {  streams } = useSelector((state) => state.classroom)


  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


  const regStudent =  async (data) => {

      
    const auth = await dispatch(createStudentAsync(data))
     const error = auth?.error?.message
   if(!error){
      toast.success('Student Created');
     !error && navigate('/view-students')

    }else{
      console.log(auth)
      toast.error(error);
    }

  
  }





  useEffect(() => {
      dispatch(getStreamsAsync())
    dispatch(getStudentsAsync())
  },[])





console.log(student)
  return (
    <>
 <Box sx={{
marginTop: '5em' ,

  marginLeft: {
    sm: `260px`,
    xs: 0,
  },
}}>
      <Grid container>
        <Card plain  sx={{ marginBottom: '5em' }}>
          <CardHeader title="Students" 
          action={
              <Button variant="contained" color="primary" 
              onClick={() => handleOpen()}>
                Add student
              </Button>
            } />
          
         
             <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Image</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Class</TableCell>
            <TableCell align="right">Registration</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Settings</TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          {student?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               <Avatar alt={row.fullname} src={row.avatar_url} />
              </TableCell>
              <TableCell align="right">{row.fullname}</TableCell>
               <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.class}</TableCell>
         
<TableCell align="right">
  {row.timestamp
    ? new Date(row.timestamp).toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : ''}
</TableCell>

                <TableCell align="right">{row.gender}</TableCell>

                <TableCell align="right"> {row.study}</TableCell>
              
          
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
        </Card>


                <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <Card sx={{ marginTop: '16px' }}>
                  <form method='POST' onSubmit={handleSubmit(regStudent)}>
            <CardContent>
     <Box>
  <Grid container spacing={2}>


    <Grid item xs={12} sm={6} md={6}>
      <label className='label'>Full Name</label>
      <input
        type="text"
        name="property"
        className="cardinput"
  
        {...register('fullname')}
      />

 






      </Grid>


<Grid item xs={12} sm={6} md={6}>
  <label className='label'>Select Form/Stream</label>
            <select className="cardinput" style={{ height: '50px' }} {...register('stream_id')}>
  
              {streams?.map((selectGroup, key) => (
                <option key={key} value={selectGroup['id']}>
                 {selectGroup['classroom']} - {selectGroup['name']}
                </option>
              ))}
            </select>
    </Grid>

<Grid item xs={12} sm={6} md={6}>
            <label className='label'>E-Mail</label>
      <input
        type="text"
        className="cardinput"
        {...register('email')}
      />
 
    </Grid>




        <Grid item xs={12} sm={6} md={6}>
     <label className='label'>Date of Admission</label>
      <input
        type="date"
        className="cardinput"
        {...register('date_reg')}
      />
    </Grid>


 
    <Grid item xs={12} sm={6} md={6}>
     <label className='label'>Mode of Study</label>
          <select className="cardinput" style={{ height: '50px' }} {...register('mode_of_study')}>
   
         
                <option  value='boarding'>
              Boarding
                </option>

                <option value='day'>
              Day
                </option>
      
            </select>
    </Grid>




    <Grid item xs={12} sm={6} md={6}>
     <label className='label'>Gender</label>
          <select className="cardinput" style={{ height: '50px' }} {...register('gender')}>
         
                <option  value='male'>
              Male
                </option>

                <option value='female'>
              Female
                </option>
      
            </select>
    </Grid>
  </Grid>
</Box>


              
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" color="primary">Save</Button>
            </CardActions>
            </form> 
              </Card>
            </Grid>
          </Grid>
        </Modal>

      </Grid>
    </Box>
 </>
  )
}

export default ViewSudents


