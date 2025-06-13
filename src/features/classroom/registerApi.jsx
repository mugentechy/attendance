import axios from 'axios'
import { url } from "../../utils/url.js"

import { getUserDetails } from '../../utils/getUserDetails';


const user = getUserDetails();


export const getRoutine = async (stream_id) => {
    try {
     const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.get(`${url}/get/routine/${stream_id}`,config);

        return data.data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}





export const getClassSubject = async (stream_id) => {
    try {
     const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.get(`${url}/classroom/${stream_id}/subjects`,config);

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}


export const getClassSubjectTeacher = async (stream_id) => {
    try {
                             const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.get(`${url}/classroom/${stream_id}/subjects/teacher`,config);

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}


export const getClassStudents = async (stream_id) => {
    try {
                              const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.get(`${url}/class/${stream_id}/students`,config);

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}






export const getClassAttendance = async (stream_id,attendance_date) => {
    try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    };

        const data= await axios.post(`${url}/check-attendance`,  {stream_id,attendance_date}, config);

        return data
    } catch(error) {
      

    if (error.response) {
       
      throw new Error(error.response.data.message || 'An error occurred');
    } else {
      throw new Error('An error occurred');
    }
    }
}






export const createClass = async (name,school_id) => {
    try {
                               const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.post(`${url}/add/classroom`,  {name}, config);

        return data
    } catch(error) {
      


              if (error.response) {

       
      throw new Error(error.response.data.message || 'An error occurred');
    } else {
      throw new Error('An error occurred');
    }
    }
}

export const assignTeacher = async (stream_id, teacher_id) => {
    try {
                              const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.post(`${url}/assign/teacher`,  {stream_id, teacher_id}, config);

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}





export const createStream = async (name,classroom_id,capacity) => {
    try {
                      const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.post(`${url}/add/stream`,  {name,classroom_id,capacity}, config);

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}
export const assignSubjectTeacher = async (subject_id, teacher_id,stream_id) => {
    try {
                       const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };
        const data= await axios.post(`${url}/assign/subject/teacher`,  {subject_id,teacher_id,stream_id}, config);

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}



export const addSubject = async (stream_id, subject) => {
    try {
                      const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.post(`${url}/add/subject`,  {stream_id, subject}, config);

        return data
    } catch(error) {
      
              if (error.response) {

       
      throw new Error(error.response.data.message || 'An error occurred');
    } else {
      throw new Error('An error occurred');
    }
    }
}


export const addSyllabus = async (stream_id, subject_id, syllabus,school_id) => {
    try {
                      const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };
       
        const data= await axios.post(`${url}/syllabus`,  {stream_id, subject_id,syllabus,school_id }, config);
     

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}



export const getClasses= async () => {
    try {
        
                      const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };
        const { data } = await axios.get(`${url}/class/data`, config)  

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}



export const getStreams = async () => {
    try {
        
                       const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };
        const { data } = await axios.get(`${url}/get/streams`, config)  

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}




export const assignRoster = async (subject_id,time_slot,day) => {
    try {
                      const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };

        const data= await axios.post(`${url}/assign/rooster`,  {subject_id,time_slot,day}, config);

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}


export const getStream = async (stream_id) => {
    try {
        
                         const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Add the token here
      }
    };
        const { data } = await axios.get(`${url}/get/stream/${stream_id}`, config)  

        return data
    } catch(error) {
      
              if (error.response) {

       
      throw new Error(error.response.data.message || 'An error occurred');
    } else {
      throw new Error('An error occurred');
    }
    }
}
