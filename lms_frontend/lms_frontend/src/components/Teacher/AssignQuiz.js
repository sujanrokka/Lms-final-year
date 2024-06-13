import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import CheckQuizinCourse from './CheckQuizinCourse';

const baseUrl='http://127.0.0.1:8000/api';

function AssignQuiz()
{
    const [quizData,setquizData]=useState([]);
    const [courseData,setcourseData]=useState([]);
    const [assignStatus,setassignStatus]=useState();

    const teacherId=localStorage.getItem('teacherId');
    const {course_id}=useParams();
    console.log(teacherId);
    useEffect(()=>
    {
        try{
        axios.get(baseUrl+'/teacher-quiz/'+teacherId+'/')
        .then((response)=>
        {
            console.log(response.data);
            setquizData(response.data);  
        });
        }catch(error){
            console.log(error);
        }
        try{
            axios.get(baseUrl+'/course/'+course_id)
            .then((response)=>
            {
                console.log(response.data);
                setcourseData(response.data);
            });
              
                
            }catch(error){
            console.log(error);
            }
            //fetch assign status
            try{
                axios.get(baseUrl+'/fetch-assign-status/'+teacherId+'/'+quiz_id)
                .then((response)=>
                {
                    console.log(response);
                     if (response.data.bool==true){
                        setassignStatus('success');
                     }
                });
                }catch(error){
                    console.log(error);
                }
                //end assign status
         
        },[]);

        
        const assignQuiz=(quiz_id)=>{
            const formData=new FormData();
            formData.append('teacher',teacherId);
            formData.append('course',course_id);
            formData.append('quiz',quiz_id);
          
            try{
                 axios.post(baseUrl+'/quiz-assign-course/',formData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
            })
           .then((res)=>{
            if(res.status===200 || res.status===201){
           window.location.reload();
                }
            });
        }catch(error){
            console.log(error.data);
           }

        }
       
    return (
      
            <div className='container mt-4'>
                <div className='row'>
                    <aside className='col-md-3'>
                        <TeacherSidebar />
                    </aside>
            <section className="col-md-9">
                <div className='card'>
                <h5 className='card-header'>Assign Quiz <span className='text-primary'>({courseData.title})</span></h5>
                <div className='card-body'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizData.map((row,index)=>
                       
                        
                        <tr>
                            <td><Link to={`/all-questions/`+row.id} > {row.title} </Link>                      
                            </td>
                            <CheckQuizinCourse quiz={row.id} course={course_id} />
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

   
export default AssignQuiz;