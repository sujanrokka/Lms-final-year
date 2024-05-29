

import React from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

function CourseDetail() {
    let { course_id } = useParams();
    return (
        <>
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-4'>
                    <img src="/logo512.png" className="img-thumbnail" alt="..."/>
                </div>
                <div className='col-8'>
                    <h3>Course title</h3>
                    <p>Documentation and examples for opting images
                         into responsive behavior so they never become 
                         larger than their parent elements
                         and add lightweight styles to them—all via classes.</p>
                        <p className='fw-bold'>Course By:<a href='#'>Teacher 1</a></p>
                        <p className='fw-bold'>Duration: 5 hrs 30 minutes</p>
                        <p className='fw-bold'>Total enrolled: 500 students</p>
                        <p className='fw-bold'>Rating: 3/5</p>

                </div>
            </div>
            {/* Course Videos */}
            <div className="card mt-4">
                <h5 className="card-header">
                    Course Videos
                </h5>
                <ul className="list-group list-group-flush ">
                    <li className="list-group-item">Introduction
                    <button className='btn btn-sm btn-danger float-end '><i class="bi bi-youtube"></i></button>
                    </li>
                    <li className="list-group-item">Setup Project
                    <button className='btn btn-sm btn-danger float-end '><i class="bi bi-youtube"></i></button>
                    </li>
                    <li className="list-group-item">Start with functional components
                    <button className='btn btn-sm btn-danger float-end '><i class="bi bi-youtube"></i></button>
                    </li>
                    <li className="list-group-item">Introduction
                    <button className='btn btn-sm btn-danger float-end '><i class="bi bi-youtube"></i></button>
                    </li>
                    <li className="list-group-item">Setup Project
                    <button className='btn btn-sm btn-danger float-end '><i class="bi bi-youtube"></i></button>
                    </li>
                    <li className="list-group-item">Start with functional components
                    <button className='btn btn-sm btn-danger float-end '><i class="bi bi-youtube"></i></button>
                    </li>
                </ul>
                </div>
                    <h3 className="pb-1 mb-4 mt-5">Related Courses </h3>
                    <div className="row mb-4">
                        <div className="col-md-3">
                        <div className="card">
                            <Link to="/detail/1"><img src="/logo512.png" className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                            <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-3">
                        <div className="card">
                            <a href="#"><img src="/logo512.png" className="card-img-top" alt="..."/></a>
                            <div className="card-body">
                            <h5 className="card-title"><a href="#">Course title</a></h5>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
    </>
    );
}

export default CourseDetail;
