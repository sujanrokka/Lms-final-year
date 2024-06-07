import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import Swal from 'sweetalert2';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function TeacherDashboard()
{
const [dashboardData,setdashboardData]=useState([]);
const teacherId=localStorage.getItem('teacherId');

useEffect(()=>{
    //fetch courses
try{
    axios.get(baseUrl+'/teacher/dashboard/'+teacherId)
   .then(res=>{
    console.log(res);
    setdashboardData(res.data);
   });  
}catch(error){
    console.log(error);
}
},[]);


    return (
<div className='container mt-4'>
    <div className='row'>
       <aside className="col-md-3">
        <TeacherSidebar />
       </aside>
       <section className='col-md-9'>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='card border-primary'>
                        <h5 className='card-header bg-primary text-white'>Total Courses</h5>
                        <div className='card-body'>
                            <h3><Link to="/teachers-courses">{dashboardData.total_teacher_courses}</Link></h3>
                        </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                    <div className='card border-success'>
                        <h5 className='card-header bg-success text-white'>Total Students</h5>
                        <div className='card-body'>
                            <h3><Link to="/teachers-courses">{dashboardData.total_teacher_students}</Link></h3>
                            
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card border-info'>
                        <h5 className='card-header bg-info text-white'>Total Chapters</h5>
                        <div className='card-body'>
                            <h3><Link to="/teachers-courses">{dashboardData.total_teacher_chapters}</Link></h3>
                            
                        </div>
                    </div>
                </div>
            </div>
       </section>    
</div> 
</div>

);
}

export default TeacherDashboard;