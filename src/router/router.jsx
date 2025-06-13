import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navigation from '../components/Navigation';
import NavBar from '../components/NavBar';
import ManageClass from '../pages/class/ManageClass';
import ViewStudents from '../pages/student/viewStudent';
import Register from '../pages/register/register';
import Login from '../pages/register/login';
import { getUserDetails } from '../utils/getUserDetails';
import ManageTimetable from '../pages/class/Timetable';


const Router = () => {

  const user = getUserDetails();



  const AuthenticatedRoute = ({ element }) => (
    <>
      <NavBar user={user} />
      {user ? element : <p>User not found.</p>}
    </>
  );

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/register" element={<><Navigation /><Register /></>} />
        <Route path="/" element={<><Navigation /><Login /></>} />
        <Route path="/timetable" element={<AuthenticatedRoute element={<ManageTimetable user={user} />} />} />
        <Route path="/view-students" element={<AuthenticatedRoute element={<ViewStudents user={user} />} />} />
        <Route path="/manage-class" element={<AuthenticatedRoute element={<ManageClass user={user} />} />} />
     </Routes>
    </BrowserRouter>
  );
};

export default Router;
