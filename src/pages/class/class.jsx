import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import { Box, Grid, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Avatar, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tab } from '@mui/material';
import { getStreamAsync } from '../../features/classroom/registerActions';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { url } from '../../utils/url';
import {  useNavigate } from 'react-router-dom';

function Classroom({ user }) {
  const navigate = useNavigate();
 const dispatch = useDispatch();
  const { id } = useParams();
  const { stream } = useSelector((state) => state.classroom);

  const [value, setValue] = useState("1");
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(getStreamAsync(id));
  }, []);

console.log(stream)


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('stream', id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.token}` 
      }
    };

    try {
      await axios.post(`${url}/import/students/${user.school_id}`, formData, config);
      toast.success('Students uploaded successfully');
       dispatch(getStreamAsync(id));
    } catch (error) {
      toast.error( error?.response?.data?.message);
    
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    

<Box sx={{

marginTop: '5em' ,


  marginLeft: {

    sm: `260px`,

    xs: 0,

  },

}}>

  <Grid container spacing={2}>

        <Grid item xs={12} sm={12} md={3}>

          <Card >
          
              <CardMedia component="img" height="140" image={stream?.class_teacher?.avatar} alt="teacher" />
              <CardContent>
                <Typography variant="h5" component="div">
                  {stream?.class_teacher?.name}
                </Typography>
                <Typography variant="body2" component="div">
                  Class Teacher
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Class:</strong> {stream?.classroom_name} - {stream?.stream_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Contact:</strong> {stream?.class_teacher?.contact}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Email:</strong> {stream?.class_teacher?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Birthday:</strong> {stream?.class_teacher?.birthday}
                </Typography>
               
              </CardContent>
                <CardActionArea>
               <Button>Message</Button>
            </CardActionArea>

          </Card>

          <Card>
            <CardHeader title="Upload Students" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <input type="file" onChange={handleFileChange} />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={handleUpload}>
                Upload
              </Button>
              <Button
  variant="contained"
  color="primary"
  component="a"
  href="/files/Uploadstudents.xlsx"
  download="Uploadstudents.xlsx"
>
  Template
</Button>

            </CardActions>
          </Card>


      </Grid>



            <Grid item xs={12} sm={12} md={6}>


<Card>


 

    <Box sx={{ width: '100%' }}>


      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

          <Tab label="Students" value="1"/>

        </Tabs>

      </Box>


                

      <Table  aria-label="simple table">

        <TableHead>

          <TableRow>

          <TableCell>Image</TableCell>

            <TableCell>Full Name</TableCell>


           <TableCell >Email</TableCell>

            <TableCell >Reg No</TableCell>


       

          </TableRow>

        </TableHead>

        <TableBody>

          {stream?.students?.map((row) => (

            <TableRow

              key={row?.id}

             

            >

              <TableCell>

               <Avatar alt={row?.name} src={row?.avatar_url} />

              </TableCell>

              <TableCell  onClick={() => navigate(`/student/${row?.id}`)} >{row?.name}</TableCell>

          <TableCell >{row?.email}</TableCell>

              <TableCell >{row?.regnum}</TableCell>

             

          

            </TableRow>

          ))}

        </TableBody>

      </Table>

   

      

    

    </Box>




 </Card>

      </Grid>



      <Grid item xs={12} sm={12} md={3}>

        <Card>

       <CardContent>

      <Table  aria-label="simple table">

        <TableHead>

          <TableRow>

        

            <TableCell>Subject</TableCell>


          

            <TableCell >Teacher</TableCell>


       

          </TableRow>

        </TableHead>

        <TableBody>

          {stream?.subject_teachers?.map((row) => (

            <TableRow

              key={row?.id}

             

            >

             

              <TableCell  onClick={() => navigate(`/student/${row?.id}`)} >{row?.subject}</TableCell>

         

              <TableCell >{row?.name}</TableCell>

             

          

            </TableRow>

          ))}

        </TableBody>

      </Table>

</CardContent>

        </Card>

      </Grid>

      </Grid>

    </Box>

 

  )

}


export default Classroom


