import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

import MenuIcon from '@mui/icons-material/Menu';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

function Nav() {
   const [showStudentOptions, setShowStudentOptions] = useState(false);

 const [showClassOptions, setShowClassOptions] = useState(false);






  return (
    <>
      <List>


  
    
             
            <ListItem disablePadding>
          <ListItemButton component="a" href="/manage-class">
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Classroom" />
          </ListItemButton>
        </ListItem>


   <ListItem disablePadding>
          <ListItemButton component="a" href="/view-students">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItemButton>
        </ListItem>

      



      <ListItem disablePadding>
          <ListItemButton component="a" href="/timetable">
            <ListItemIcon>
              <ChecklistRtlIcon />
            </ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItemButton>
        </ListItem>




      </List>
    </>
  );
}

export default Nav;
