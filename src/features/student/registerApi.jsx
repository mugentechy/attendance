import axios from 'axios'
import { url } from "../../utils/url.js"
import { getUserDetails } from '../../utils/getUserDetails';

const user = getUserDetails();


export const createUser = async (fullname,stream_id,regnum, birthday, date_reg, results,  address, gender, timestamp, email,mode_of_study,avatar_url) => {
    try {
const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.post(`${url}/add/student`,  {fullname,stream_id,regnum, birthday, date_reg, results,  address, gender, timestamp, email,mode_of_study,avatar_url }, config);

        return data
    }  catch(error) {

         console.log(error)

         if (error.response) {

       
      throw new Error(error.response.data.message || 'An error occurred while adding the school');
    } else {
      throw new Error('An error occurred while adding the school');
    }

    }
}

export const getStudents = async () => {
    try {
        
const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    };
        const { data } = await axios.get(`${url}/get/students`, config)  

        return data
    } catch(error) {

         console.log(error)

         if (error.response) {

       
      throw new Error(error.response.data.message || 'An error occurred while adding the school');
    } else {
      throw new Error('An error occurred while adding the school');
    }

    }
}


export const getStudent = async (student_id) => {
    try {
        
 const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };
        const { data } = await axios.get(`${url}/get/student/${student_id}`, config)  

        return data
    } catch(error) {
         if (error.response) {
       
      throw new Error(error.response.data.message || 'An error occurred');
    } else {
      throw new Error('An error occurred');
    }

    }
}

export const updateUser = async (student_id,fullname, address,gender, contact, email ) => {
    try {
     const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.post(`${url}/update/student/${student_id}`,  { fullname, address,gender, contact, email }, config);

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}
