
  
import Header from './Header';
import Home from './Home';
import About from './About';
import CourseDetail from './CourseDetail';
import Footer from './Footer';
import Login from './User/Login';
import Register from './User/Register';

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
        </Routes>
        <Footer />
      </div>
    );
}

export default Main;
