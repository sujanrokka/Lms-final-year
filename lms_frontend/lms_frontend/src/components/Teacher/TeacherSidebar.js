import {Link} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
function TeacherSidebar(){
    return (
    <div className='card'> 
            <h5 className='card-header'>Dashboard</h5>
            <div className='list-group list-group-flush'>
            <Link to='/user-dashboard' className='list-group-item list-group-item-action'>Dashboard</Link>
            <Link to='/my-courses' className='list-group-item list-group-item-action'>My Courses</Link>
            <Link to='/my-courses' className='list-group-item list-group-item-action'>Add Courses</Link>
            <Link to='/my-courses' className='list-group-item list-group-item-action'>My Users</Link>
            <Link to='/profile-setting' className='list-group-item list-group-item-action'>Profile Setting</Link>
            <Link to='/change-password' className='list-group-item list-group-item-action'>Change Password</Link>
            <Link to='/user-login' className='list-group-item list-group-item-action text-danger'>Logout</Link>
        </div>
        </div>
        );
        }

    export default TeacherSidebar