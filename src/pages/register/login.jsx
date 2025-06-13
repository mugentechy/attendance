import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {  useNavigate } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux'
import { authSchoolAsync } from '../../features/school/registerActions'
import { useForm } from 'react-hook-form'

import { toast } from "react-hot-toast";


function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { register, handleSubmit, watch,setValue } = useForm()


  const authSchool=  async (data) => {
    const auth = await dispatch(authSchoolAsync(data))
  
    const user = auth?.payload?.school_id
 
     if(user){
      toast.success('Login Succesful!');
      navigate('/timetable')

    }else{
    
     toast.error(auth?.payload);
    }
  }




  const setCustomValue = (id, value) => {
   
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }



  return (
<Box>
  <Card  sx={{ marginTop: '5em' }}>
    <Grid container spacing={2}>
    <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', marginTop: '5em' , alignItems: 'center', padding: '2em' }}>
  <img src="https://res.cloudinary.com/doammcpie/image/upload/v1687597124/signin-image_l1y2eg.jpg" alt="Your Image" />
  <Typography  onClick={() => navigate(`/register`)} component="div" variant="body">
   Create an account
  </Typography>
</Grid>
      <Grid className='login_item' item xs={12} sm={6}>
          <Typography component="div" variant="h5" sx={{ margin: '1em' }}>
      Sign In
    </Typography>
        <form method="POST" onSubmit={handleSubmit(authSchool)}>
<CardContent>
  <Grid container spacing={2}>

    <Grid item xs={12}>
      <label className='label'>Username</label>
      <input
        type="email"
        className="cardinput"
        {...register('created_by')}
      />
    </Grid>
        <Grid item xs={12}>
      <label className='label'>Password</label>
      <input
        type="password"
        className="cardinput"
        {...register('password')}
      />
    </Grid>

  </Grid>
</CardContent>
          <CardActions>
            <Button variant="contained" type="submit"  color="primary">
              Log in
            </Button>
          </CardActions>
        </form>
      </Grid>

    </Grid>
  </Card>
</Box>


  )
}

export default Login;


