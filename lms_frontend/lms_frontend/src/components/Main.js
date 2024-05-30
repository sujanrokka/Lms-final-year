
  
import Header from './Header';
import Home from './Home';
import CourseDetail from './CourseDetail';
import Dashboard from './User/Dashboard';
import Login from './User/Login';
import Register from './User/Register';
import MyCourses from './User/MyCourses';
import Sidebar from './User/Sidebar';
import FavouriteCourses from './User/FavouriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import ProfileSetting from './User/ProfileSetting';
import ChangePassword from './User/ChangePassword';

//Teachers

import TeacherRegister from './Teacher/TeacherRegister';
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherSidebar from './Teacher/TeacherSidebar';



import About from './About';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';



function Main() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:course_id" element={<CourseDetail />} />
          <Route path="/user-login" element={<Login />} />
          <Route path="/user-register" element={<Register />} />
          <Route path="/user-dashboard" element={<Dashboard />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/favourite-courses" element={<FavouriteCourses />} />
          <Route path="/recommended-courses" element={<RecommendedCourses />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher-register" element={<TeacherRegister />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher-sidebar" element={<TeacherSidebar />} />
        </Routes>
        <Footer />
      </div>
    );
}

export default Main;
