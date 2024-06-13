import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function CheckQuizinCourse(props)
{
    const [quizData,setquizData]=useState([]);
    const teacherId=localStorage.getItem('teacherId');
    
    useEffect(()=>
    {
        try{
        axios.get(`${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`)
        .then((response)=>
        {
            setquizData(response.data);  
        });
        }catch(error){
            console.log(error);
        }
                
         
        },[]);

        
        const assignQuiz=(quiz_id)=>{
            const formData=new FormData();
            formData.append('teacher',teacherId);
            formData.append('course',props.course_id);
            formData.append('quiz',props.quiz_id);
          
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
      <td>
        {quizData.bool===false &&
        <button className='btn btn-primary' onClick={()=>assignQuiz(props.quiz)}>Assign Quiz</button>
        }
        {quizData.bool===true &&
        <span className='text-success'>Assigned</span>
        }

      </td>
           

    );
    }

   
export default CheckQuizinCourse;