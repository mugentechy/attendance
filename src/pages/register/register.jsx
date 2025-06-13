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
import { addSchoolAsync } from '../../features/school/registerActions'
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast";



function Register() {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { register, handleSubmit,setValue } = useForm()



  const regSchool=  async (data) => {
 

    console.log(data)
    const auth = await dispatch(addSchoolAsync(data))
    const error = auth?.error?.message
     if(!error){
      toast.success('School Registerd!');
     !error && navigate('/register')

    }else{
      toast.error(auth?.payload);
    }
  }



 

  

  return (
<Box >
  <Card  sx={{width: { sm: '100%', md: '80%' }}}>
    <Grid container sx={{ marginTop: '5em' }} spacing={2}>
    
      <Grid  item sm={12} md={6}>
          <Typography component="div" variant="h5" sx={{ margin: '1em' }}>
      School Registration
    </Typography>
        <form method="POST" onSubmit={handleSubmit(regSchool)}>
<CardContent>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <label className='label'>School Name</label>
      <input
        type="text"
        className="cardinput"
        {...register('name')}
      />
    </Grid>




    <Grid item xs={12}>
      <label className='label'>Email Address</label>
      <input
        type="email"
        className="cardinput"
        {...register('created_by')}
      />
    </Grid>


       <Grid item xs={12}>
      <label className='label'>Paassword</label>
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
              Save
            </Button>
          </CardActions>
        </form>
      </Grid>
<Grid item sm={12} md={6} sx={{ display: 'flex', flexDirection: 'column', marginTop: '5em' , alignItems: 'center', padding: '2em' }}>
  <img src="https://res.cloudinary.com/doammcpie/image/upload/v1687591197/i_bbqhfh.jpg" alt="Your Image" />
  <Typography  onClick={() => navigate(`/`)} component="div" variant="body">
    I am already a member
  </Typography>
</Grid>

    </Grid>
 </Card>
</Box>


  )
}

export default Register;


