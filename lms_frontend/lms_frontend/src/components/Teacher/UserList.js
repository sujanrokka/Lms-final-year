import {Link} from 'react-router-dom';

import TeacherSidebar from './TeacherSidebar';
function UserList()
{
    return (
        <div className='container mt-4'>
        <div className='row'>
           <aside className="col-md-3">
            <TeacherSidebar />
           </aside>
           <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'>UserList</h5>
                    <div className='card-body'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Enrolled Courses</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Link to='/teacher/enrolled-students'>Enrolled Students</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to='/teacher/user-list'>User List</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to='/teacher/change-password'>Change Password</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td><Link to='/teacher/add-course'>Add Course</Link></td>
                                </tr>
                                <tr>
                                    
                                       <td><Link to='/teacher/my-courses'>My Courses</Link></td>
                                </tr>
                </tbody>
                </table>
                </div>
                </div>
           </section>    
    </div> 
    </div>
);
}

export default UserList;