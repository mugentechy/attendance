import React from 'react';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import "./SideBar.css"


const SideBarOption = ({Icon, title, number, seleced, onClick }) => {


  return (
  <div className={`sidebar_option ${seleced && 'sidebar_option--active'}`}   onClick={onClick}>
  <Icon />
  <h3>{title}</h3>
  <p>{number}</p>
 
    
  </div>
  );
};

export default SideBarOption;