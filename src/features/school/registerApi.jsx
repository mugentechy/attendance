import axios from 'axios'
import { url } from "../../utils/url.js"



export const addSchool = async ( name,created_by,password) => {
    try {
const config = {
      headers: {
        'Content-Type': 'application/json',
      
      }
    };


        const data= await axios.post(`${url}/add/school`,  { name,created_by,password}, config);

        return data
    } catch(error) {
         if (error.response) {
       
      throw new Error(error.response.data.message || 'An error occurred while adding the school');
    } else {
      throw new Error('An error occurred while adding the school');
    }

    }
}



export const authSchool = async ( created_by,password) => {
    try {
        
 const config = {
      headers: {
        'Content-Type': 'application/json',
       
      }
    };


        const data= await axios.post(`${url}/auth/school`,  { created_by,password}, config);

        return data
    } catch(error) {
         if (error.response) {
       
      throw new Error(error.response.data.message || 'An error occurred');
    } else {
      throw new Error('An error occurred');
    }
    }
}



