import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function TeacherDetail(){
    const [courseData,setCourseData]=useState([]);
    const [teacherData,setteacherData]=useState([]);
    let {teacher_id} = useParams();
    useEffect(()=>
        {
            try{
            axios.get(baseUrl+'/teacher/'+teacher_id)
            .then((response)=>
            {
                console.log(response.data);
                setteacherData(response.data);
                setCourseData(response.data.teacher_courses);  
            });
            }catch(error){
                console.log(error);
            }
            },[]);
return(
    <div className='container mt-3'>
            <div className='row'>
                <div className='col-4'>
                    <img src="/teachers.png" className="img-thumbnail" alt="Teacher Image"/>
                </div>
                <div className='col-8'>
                    <h3>{teacherData.full_name}</h3>
                    <p>{teacherData.detail}</p>
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
                    {courseData.map((course,index)=>
                     <Link to={`/detail/${course.id}`} className="list-group-item list-group-item-action ">{course.title}</Link>
                    )}
                   
                </div>
                </div>
             </div>
);
}

export default TeacherDetail;