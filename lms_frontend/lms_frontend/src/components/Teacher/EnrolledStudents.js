import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function EnrolledStudents()
{
    const [studentData,setStudentData]=useState([]);
    const teacherId=localStorage.getItem('teacherId');
    let {course_id}=useParams();
    console.log(teacherId);
    useEffect(()=>
    {
        try{
        axios.get(baseUrl+'/fetch-enrolled-students/'+course_id+'/')
        .then((response)=>
        {
            console.log(response.data);
            setStudentData(response.data);
        });
        }catch(error){
            console.log(error);
        }
        },[]);
        
    return (
            <div className='container mt-4'>
                <div className='row'>
                    <aside className='col-md-3'>
                        <TeacherSidebar />
                    </aside>
            <section className="col-md-9">
                <div className='card'>
                <h5 className='card-header'>Enrolled Students</h5>
                <div className='card-body'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData && studentData.map((row,index)=>
                        <tr>
                            <td><Link to={'/view-student/'+row.student.id} > {row.student.full_name} </Link> </td>
                            <td>{row.student.email}</td>
                            <td>{row.student.username}</td>
                            <td>
                                <Link class="btn btn-info btn-sm " to={'/view-student/'+row.student.id}> View </Link>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </div>
        </section>
        </div>
        </div>
        );
    }  
export default EnrolledStudents;