

import React from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

import {useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const siteUrl='http://127.0.0.1:8000/';
const baseUrl='http://127.0.0.1:8000/api';


function CourseDetail() {
    const [courseData,setCourseData]=useState();
    const [teacherData,setteacherData]=useState([]);
    const [chapterData,setChapterData]=useState([]);
    const [relatedcourseData,setrelatedcourseData]=useState([]);
    const [techListData,settechListData]=useState([]);
    const [userLoginStatus,setuserLoginStatus]=useState();
    const [enrollStatus,setenrollStatus]=useState();
    let {course_id} = useParams();
    const studentId=localStorage.getItem('studentId');
    console.log(course_id);

    //fetch courses when page load
    useEffect(()=>
        {
            try{
            axios.get(baseUrl+'/course/'+course_id)
            .then((response)=>
            {
                console.log(response.data);
                setCourseData(response.data);
                setteacherData(response.data.teacher);
                setChapterData(response.data.course_chapters);
                setrelatedcourseData(JSON.parse(response.data.related_videos));
                settechListData(response.data.tech_list);
            });
            }catch(error){
            console.log(error);
            }
         
           

    //fetch enroll status
    try{
        axios.get(baseUrl+'/fetch-enroll-status/'+studentId+'/'+course_id)
        .then((response)=>
        {
            console.log(response);
             if (response.data.bool==true){
                setenrollStatus('success');
             }
            
         
        });
        }catch(error){
            console.log(error);
        }
        const studentLoginStatus=localStorage.getItem('studentLoginStatus');
        if(studentLoginStatus==='true'){
        setuserLoginStatus('success');

        }
        
        },[]);


        
        const enrollCourse=()=>{
            const studentId=localStorage.getItem('studentId');
            const formData=new FormData();
            formData.append('course',course_id);
            formData.append('student',studentId);
          
            try{
            axios.post(baseUrl+'/student-enroll-course/',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
           .then((res)=>{
            if(res.status===200||res.status===201){
                Swal.fire({ 
                    title:'You have Sucessfully enrolled ',
                    toast:'success',
                    timer:3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton:false
                 });
                 setenrollStatus('success');
                }
            });
        }catch(error){
            console.log(error.data);
           }

        }
    return (
        <div>
        <div className='container mt-3'>
           {courseData && ( <div className='row'>
                <div className='col-4'>
                    <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title}/>
                </div>
                <div className='col-8'>
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                        <p className='fw-bold'>Course By:<Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                        <p className='fw-bold'>Techs:&nbsp;
                        {techListData.map((tech,index)=>
                        <>
                        <Link className="badge bg-warning ml-2" to={`/category/${tech.trim()}`}>{tech.trim()}</Link>
                        </>
                        )}
                        </p>
                        <p className='fw-bold'>Duration: 5 hrs 30 minutes</p>
                        <p className='fw-bold'>Total enrolled: 500 students</p>
                        <p className='fw-bold'>Rating: 3/5</p>
                        { userLoginStatus==='success' && enrollStatus!=='success' &&
                        <p><button type='button'  onClick={enrollCourse} className='btn btn-success'>Enroll in this course</button></p>
                         }
                         { enrollStatus ==='success' && userLoginStatus==='success' &&
                        <p><span>You have already enrolled in this course</span></p>
                         }
                        { userLoginStatus!=='success' &&
                        <p><Link to="/user-login">Please Login to enroll</Link></p>
                        }
                    
    
                </div>
            </div>
        )}
            {/* Course Videos */}
            { enrollStatus === 'success' && userLoginStatus =='success' &&
            <div className="card mt-4">
                <h5 className="card-header">
                    In this course
                </h5>
                <ul className="list-group list-group-flush ">
                {courseData && courseData.course_chapters.map((chapter,index)=>
                    <li className="list-group-item">{chapter.title}
                    <span className='float-end'>
                        <span className='me-4'>1:30 mins</span>
                        <button className="btn btn-sm btn-danger float-end" data-bs-toggle="modal" data-bs-target="#videomodal1"><i class="bi bi-youtube"></i></button>
                    </span>
                    <div className="modal fade" id="videomodal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                        { /* video modal start*/}
                        <div className="modal-dialog model-xl">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="videoModalLabel">Video 1</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <div className="ratio ratio-16x9">
                            <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
                            </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        { /* video modal end*/}
                    </li>
                )} 
                </ul>
                </div>
            }


                    <h3 className="pb-1 mb-4 mt-5">Related Courses </h3>
                    <div className="row mb-4">
                    {relatedcourseData.map((rcourse,index)=>
                        <div className="col-md-3">
                            <div className="card">
                                <Link target="__blank"to={`/detail/${rcourse.pk}`} > <img src={`${siteUrl}media/${rcourse.fields.featured_img}`} className="card-img-top" alt={rcourse.fields.title}/></Link>
                                <div className="card-body">
                                <h5 className="card-title"><Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></h5>
                                </div>
                                </div>
                            </div>
                            )};
                    </div>
                </div>
        </div>
    );
}


export default CourseDetail;
