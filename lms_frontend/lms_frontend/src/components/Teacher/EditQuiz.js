import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import Swal from 'sweetalert2';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function EditQuiz()
{
    const teacherId=localStorage.getItem('teacherId');
    const [quizData,setquizData]=useState({
       
        title:'',
        detail:'', 
    });
    const {quiz_id}=useParams();

    //fetch current quiz data

    useEffect(()=>
        {
    try{
        axios.get(baseUrl+'/teacher-quiz-detail/'+quiz_id)
        .then((response)=>
        {
            setquizData({
                title:response.data.title,
                detail:response.data.detail,     
        });
        });  
    
         }catch(error){
            console.log(error);
        }
    },[]);
    
    //end

    const handleChange=(event)=>{
        setquizData({
            ...quizData,
            [event.target.name]:event.target.value
        });
    }
    
   
    const formSubmit=()=>{
        const formData=new FormData();
        formData.append('teacher',teacherId);
        formData.append('title',quizData.title);
        formData.append('detail',quizData.detail);
       
        try{
        axios.put(baseUrl+'/teacher-quiz-detail/'+quiz_id,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
       .then((res)=>{
        if(res.status===200){
            Swal.fire({
                title: 'Data has been updated',
                icon: 'success',
                toast:true,
                timer:3000,
                position:'top-right',
                timerProgressBar:true,
                showConfirmButton:false
     });
        }
        });
    }catch(error){
        console.log(error);
       }
    };
    return (
        <div className='container mt-4'>
        <div className='row'>
            <aside className="col-md-3">
                <TeacherSidebar />
            </aside>
            <div className='col-9'>
            <div className='card'>
                <h3 className='card-header'>Edit Quiz</h3>
                <div className='card-body'>
                <form>
               
                <div className="mb-3">
                    <label htmlFor="title" className="form-label float-start">Title</label>
                    <input type="text" value={quizData.title} onChange={handleChange} id="title" name='title' className="form-control"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="detail" className="form-label float-start">Detail</label>
                    <textarea name='detail' value={quizData.detail} onChange={handleChange} className="form-control " id="detail"  />
                </div>
                <button type="submit" onClick={formSubmit} className="btn btn-primary float-start">Submit</button>
                </form>
                </div>
            </div>
        </div>
    </div> 
    </div>
    );

}

export default EditQuiz;


