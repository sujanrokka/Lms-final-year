import {Link} from 'react-router-dom';

import TeacherSidebar from './TeacherSidebar';
function TeacherCourses()
{
    return (
        <div className='container mt-4'>
        <div className='row'>
           <aside className="col-md-3">
            <TeacherSidebar />
           </aside>
           <section className='col-md-9'>
                Teacher Courses
           </section>    
    </div> 
    </div>
);
}

export default TeacherCourses;