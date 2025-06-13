import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardHeader, CardContent, CardActions,
  Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Tabs, Tab, Modal
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import TabContext from '@mui/lab/TabContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";

// Actions
import {
  createStreamAsync,
  getClassesAsync,
  getClassSubjectTeacherAsync,
  addSubjectAsync
} from '../../features/classroom/registerActions';

import { subjects } from '../../utils/data.js';

const classOptions = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

function ManageClass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const { classroom, subjectteacher } = useSelector((state) => state.classroom);

  useEffect(() => {
    dispatch(getClassesAsync());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = (classId) => {
    dispatch(getClassSubjectTeacherAsync(classId));
    setSelectedClassId(classId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClassId(null);
  };

  const handleStreamSubmit = async (data) => {
    const res = await dispatch(createStreamAsync(data));
    if (!res?.error) {
      toast.success('Stream Created');
      dispatch(getClassesAsync());
    } else {
      toast.error(res.error.message);
    }
  };

const handleModalSubmit = async (data) => {
  const payload = {
    subject: data.subject, // subject name from the select input
    stream_id: selectedClassId,
  };
  console.log(payload);
  const res = await dispatch(addSubjectAsync(payload));
  if (!res?.error) {
    toast.success('Subject Added');
    dispatch(getClassSubjectTeacherAsync(selectedClassId));
  } else {
    toast.error(res.error.message);
  }
};

  return (
    <Box sx={{ marginTop: '5em', marginLeft: { sm: '260px', xs: 0 } }}>
      <Grid container spacing={2}>
        {/* Form Section */}
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ marginBottom: '16px' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTabChange}>
                  <Tab label="Class" value="1" />
                </Tabs>
              </Box>

              <form onSubmit={handleSubmit(handleStreamSubmit)}>
                <CardContent>
                  <label className='label'>Select Class</label>
                  <input
                    className="cardinput"
                    style={{ height: '50px' }}
                    list="classes"
                    {...register('name')}
                  />
                  <datalist id="classes">
                    {classOptions.map((className, index) => (
                      <option key={index} value={className} />
                    ))}
                  </datalist>

                  <label className='label'>Capacity</label>
                  <input
                    type="number"
                    className="cardinput"
                    {...register('capacity')}
                  />
                </CardContent>
                <CardActions>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </CardActions>
              </form>
            </TabContext>
          </Card>
        </Grid>

        {/* Table Section */}
        <Grid item xs={12} sm={8} md={8}>
          <Card>
            <CardHeader title="Running Classes" />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class</TableCell>
                    <TableCell align="right">Capacity</TableCell>
                    <TableCell align="right">Students</TableCell>
                    <TableCell align="right">Subjects</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classroom?.map((room) => (
                    <TableRow key={room.id} hover>
                      <TableCell>{room.name}</TableCell>
                      <TableCell align="right">{room.capacity}</TableCell>
                      <TableCell align="right">{room.student_count}</TableCell>
                      <TableCell align="right">
                        <SettingsIcon
                          onClick={() => handleOpen(room.id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Modal for Subjects */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='assign-subject-modal'
        aria-describedby='assign-subject-to-class'
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: '100vh' }}
        >
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <form onSubmit={handleSubmit(handleModalSubmit)}>
                <label className="label">Select Subject</label>
                <select className="cardinput" style={{ height: '50px' }} {...register('subject')}>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Save
                </Button>
              </form>
            </Card>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell align="right">Teacher</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjectteacher?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell align="right">{row.teacher}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
}

export default ManageClass;
