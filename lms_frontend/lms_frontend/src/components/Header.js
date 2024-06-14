import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Header() {
  const [searchString, setsearchString] = useState({
    'search':""
  });

  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus=localStorage.getItem('studentLoginStatus')

  const handleChange = (event) => {
    setsearchString({
        ...searchString,
        [event.target.name]: event.target.value
    });
};

  const searchCourse = () =>{
    if (searchString.search !=''){
    window.location.href='/search/'+searchString.search
  }
}
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">ShikshyaVerse</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <form className="d-flex">
              <input onChange={handleChange} name='search' className="form-control me-2" type="search" placeholder="Search by course title" aria-label="Search"/>
              <button onClick={searchCourse} className="btn btn-warning" type="button">Search</button>
          </form>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/all-courses">Courses</Link>
              </li>

              <li class="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" 
                data-bs-toggle="dropdown" aria-expanded="false">
                  Teacher
                </Link>
               
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {teacherLoginStatus!=='true' &&
                  <>
                  <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                  <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
                  </>
                  }
                   {teacherLoginStatus==='true' &&
                   <>
                  <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                  </>
                }
                  </ul>
                 
                </li>

             
              <li class="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" 
                                            data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {studentLoginStatus!=='true' &&
                <>
                  <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                  <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
                  </>
                }
                {studentLoginStatus==='true' &&
                <>
                  <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li>
                  </>
              }
            
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Header;