import {Link} from 'react-router-dom';
function TeacherDetail(){
return(
    <div className='container mt-3'>
            <div className='row'>
                <div className='col-4'>
                    <img src="/teachers.png" className="img-thumbnail" alt="Teacher Image"/>
                </div>
                <div className='col-8'>
                    <h3>Sujan Rokka</h3>
                    <p>Documentation and examples for opting images
                         into responsive behavior so they never become 
                         larger than their parent elements
                         and add lightweight styles to them—all via classes.</p>
                        <p className='fw-bold'>Skills:<Link to='/category/php'>PHP</Link>,<Link to='/category/python'>Python</Link>,<Link to='/category/java'>Java</Link></p>
                        <p className='fw-bold'>Recent Course:<Link to='/teacher-detail/1'>React Js Course</Link></p>
                        <p className='fw-bold'>Rating: 3/5</p>

                </div>
            </div>
            {/* Course list*/}
            <div className="card mt-4">
                <h5 className="card-header">
                    Course List
                </h5>
                <div className="list-group list-group-flush ">
                    <Link to='/detail/1' className="list-group-item list-group-item-action ">Php Course 1</Link>
                    <Link to='detail/1' className="list-group-item list-group-item-action ">Php Course 2</Link>
                    <Link to='detail/1' className="list-group-item list-group-item-action ">Java</Link>
                    <Link to='detail/1' className="list-group-item list-group-item-action ">Python</Link>
                    <Link to='detail/1' className="list-group-item list-group-item-action ">Ruby</Link>
                </div>
                </div>
             </div>
);
}

export default TeacherDetail;