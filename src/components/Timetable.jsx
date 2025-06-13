import React, { useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { timeSlots } from '../utils/data.js';
import axios from 'axios'
import { toast } from "react-hot-toast";
import { url } from "../utils/url.js"
import { Navigate, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Checkbox, FormControlLabel } from "@mui/material";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Timetable({ data, user }) {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();


  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
const [selectedSubject, setSelectedSubject] = useState(null);
const [students, setStudents] = useState([]);
const [attendance, setAttendance] = useState({});
const [attendanceId, setAttendanceId] = useState(null);
const handleAttendanceChange = (studentId, isChecked) => {
  setAttendance((prev) => ({
    ...prev,
    [studentId]: isChecked,
  }));
};

const handleSubmitAttendance = async () => {
  try {
    await axios.post(`${url}/attendance/submit`, {
      routine_id: attendanceId,
      attendance: attendance,
    });

    alert("Attendance submitted!");
    setSubjectModalOpen(false);
  } catch (err) {
    console.error(err);
    alert("Error submitting attendance");
  }
};




const handleSubject = async (event) => {
  setSelectedSubject(event.subject);
  setAttendanceId(event['routine_id'])
  setSubjectModalOpen(true);

 
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    }
  };

  try {
    const response = await axios.get(`${url}/get-routine/${event['routine_id']}`, config);
    console.log(response.data.students)
    setStudents(response.data.students); // Adjust based on your backend's return format
  } catch (error) {
    toast.error("Failed to fetch students");
    console.error(error);
  }
};


  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
 

  const handleDelete = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    };

    try {
      await axios.post(`${url}/delete/routine/${selectedEvent['routine_id']}`, null, config);
      toast.success('Schedule removed succesfully');
      navigate('/timetable')
    } catch (error) {
      toast.error('Failed to upload teachers', error);
      console.log(error.response.data);
    }
  };

  const eventsByDay = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  data?.forEach((event) => {
    const dayToDisplay = event.day;
    eventsByDay[dayToDisplay].push(event);
  });

  return (
    <div>
      <Card>
        <CardHeader title="Class Timetable" />
        <table className="timetable">
          <thead>
            <tr>
              <th className="timetable__header"></th>
              {timeSlots.map((slot, index) => (
                <th key={index} className="timetable__header">
                  {slot.start} <br /> {slot.end}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day, dayIndex) => (
              <tr key={dayIndex}>
                <td className="timetable__header">{day}</td>
                {timeSlots.map((slot, slotIndex) => (
                  <td key={slotIndex} className="timetable__cell">
                    {eventsByDay[day]
                      .filter((event) => event.time_slot === `${slot.start} - ${slot.end}`)
                      .map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="timetable__event"
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSubject(event)}
                              >
                                {event.subject.name}
                              </div>
                              <div>
                                {/* Additional event details can go here */}
                              </div>
                            </div>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              color="error"
                              onClick={() => handleOpen(event)}
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </div>
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this event from the timetable?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" sx={{ ml: 1 }}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>





<Modal
  open={subjectModalOpen}
  onClose={() => setSubjectModalOpen(false)}
  aria-labelledby="subject-modal-title"
  aria-describedby="subject-modal-description"
>
  <Box sx={modalStyle}>
    <Typography id="subject-modal-title" variant="h6" component="h2">
      Students Doing: {selectedSubject?.name}
    </Typography>

    <Box sx={{ mt: 2 }}>
      {students.length > 0 ? (
        students.map((student, index) => (
             <Typography id="subject-modal-title" variant="h6" component="h2">
      {student?.fullname}
 

          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={!!attendance[student.id]}
                onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
              />
              
            }
              
          
          />
           </Typography>
        ))
      ) : (
        <Typography>No students found</Typography>
      )}
    </Box>

    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Button onClick={handleSubmitAttendance} variant="contained" color="primary">
        Submit Attendance
      </Button>
      <Button onClick={() => setSubjectModalOpen(false)} color="secondary">
        Close
      </Button>
    </Box>
  </Box>
</Modal>




    <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Attendance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
{students
  ?.filter((row) => row?.id) // Filters out students with id = 0, null, undefined
  .map((row) => (
    <TableRow key={row?.id}>
      <TableCell>
        <Avatar alt={row?.name} src={row?.avatar_url} />
      </TableCell>
      <TableCell>{row?.fullname}</TableCell>
      <TableCell>
  {row?.attendance === true
    ? "Present"
    : row?.attendance === false
    ? "Absent"
    : "Not Recorded"}
</TableCell>
    </TableRow>
))}

                </TableBody>
              </Table>

    </div>
  );
}

export default Timetable;