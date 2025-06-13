import { useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {  useNavigate } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux'
import { 
 getRoutineAsync,assignRosterAsync,getClassesAsync,getClassSubjectAsync,
  getClassSubjectTeacherAsync} from '../../features/classroom/registerActions'
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast";

import Timetable from '../../components/Timetable';

import { timeSlots, day} from '../../utils/data.js';

function ManageSubject({ user }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { lesson, classroom, routine } = useSelector((state) => state.classroom);

  const [classrooms, setClassrooms] = useState();



  useEffect(() => {
    dispatch(getClassesAsync());
  }, [dispatch]);

  

  const handleClassroomChange = (selectedValue) => {
    setClassrooms(selectedValue);
    dispatch(getClassSubjectAsync(selectedValue));
    dispatch(getClassSubjectTeacherAsync(selectedValue));
    dispatch(getRoutineAsync(selectedValue));
  };




  const onSubmit = async (data, actionType) => {
    let auth;
    let successMessage;
    let errorMessage;

    switch (actionType) {
      case 'assignRoster':
        auth = await dispatch(assignRosterAsync(data));
        
        successMessage = 'Time table created';
        errorMessage = auth?.error?.message;
        break;
      default:
        return;
    }

    if (!errorMessage) {
      toast.success(successMessage);
      dispatch(getRoutineAsync(classrooms));
     
    } else {
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        marginTop: '5em',
        marginLeft: {
          sm: `260px`,
          xs: 0
        }
      }}
    >
 
    <Card>
        <CardHeader
          title="Class Schedule"
        />
        <CardContent>
             
             
        
                  <form method="POST" onSubmit={handleSubmit((data) => onSubmit(data, 'assignRoster'))}>
                      
                    <Grid container>

                    <Grid item  sm={12} md={3}>
                      <label className="label">Select Stream</label>
                      <select
                        className="cardinput"
                        style={{ height: '50px' }}
                        onChange={(e) => handleClassroomChange(e.target.value)}
                      >
                        {classroom?.map((stream) => (
                            <option key={stream.id} value={stream.id}>
                              {stream.name} - {stream.name}
                            </option>
                          ))}

                      </select>
                       </Grid>

 <Grid item sm={12} md={3}>
                      <label className="label">Select Subject</label>
                      <select className="cardinput" style={{ height: '50px' }} {...register('subject_id')}>
                        {lesson?.map((selectGroup, key) => (
                          <option key={key} value={selectGroup['id']}>
                            {selectGroup['subject']}
                          </option>
                        ))}
                      </select>
                       </Grid>

 <Grid item sm={12} md={3}>
                      <label className="label">Select Day</label>
                      <select className="cardinput" style={{ height: '50px' }} {...register('day')}>
                        {day?.map((selectGroup, key) => (
                          <option key={key} value={selectGroup['label']}>
                            {selectGroup['label']}
                          </option>
                        ))}
                      </select>
                       </Grid>

                    <Grid item sm={12} md={3}>
                      <label className="label">Select Time Slot</label>
                      <select className="cardinput" style={{ height: '50px' }} {...register('time_slot')}>
                        <option></option>
                        {timeSlots.map((timeSlot, key) => (
                          <option key={key} value={`${timeSlot.start} - ${timeSlot.end}`}>
                            {timeSlot.start} - {timeSlot.end}
                          </option>
                        ))}
                      </select>
                    </Grid>

<Grid item sx={{ marginTop: '2em' }}>
                    <Button type="submit" variant="contained" color="primary">
                      Create Timetable
                    </Button>
                     </Grid>
                      </Grid>
                  </form>
                   </CardContent>

                  </Card>
            
          
      


      <Grid sx={{ marginTop: '2em', marginBottom: '5em' }} container>
        <Timetable data={routine}  user={user}  />
      </Grid>



               

    </Box>
    
  );
}

export default ManageSubject
