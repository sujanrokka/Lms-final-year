import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function UserList()
{
    const [studentData,setStudentData]=useState([]);

    const teacherId=localStorage.getItem('teacherId');
    console.log(teacherId);
    useEffect(()=>
    {
        try{
        axios.get(baseUrl+'/fetch-all--enrolled-students/'+teacherId)
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
                <h5 className='card-header'>All  Students Listt</h5>
                <div className='card-body'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Interested Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData && studentData.map((row,index)=>
                        <tr>
                            <td>{row.student.full_name}</td>
                            <td>{row.student.email}</td>
                            <td>{row.student.username}</td>
                            <td>{row.student.interested_categories}</td>
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
export default UserList;