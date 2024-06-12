
import TeacherSidebar from './TeacherSidebar';
import {useState} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function AddQuiz()
{
    const [quizData,setquizData]=useState({
      
        title:'',
        detail:'',
        
    });

    const handleChange=(event)=>{
        setquizData({
            ...quizData,
            [event.target.name]:event.target.value
        });
    }

    const formSubmit=(e)=>{
        e.preventDefault();
        const teacherId=localStorage.getItem('teacherId');
        const formData=new FormData();
        formData.append('teacher',teacherId);
        formData.append('title',quizData.title);
        formData.append('detail',quizData.detail);
        
        try{
        axios.post(baseUrl+'/quiz/',formData,{
                   })
       .then((res)=>{
        window.location.href='/add-quiz';
        });
    }catch(error){
        console.log(error.data);
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
            {JSON.stringify(quizData)}
                <h3 className='card-header'>Add Quiz</h3>
                <div className='card-body'>
                <form>
               
                <div className="mb-3">
                    <label htmlFor="title" className="form-label float-start">Title</label>
                    <input type="text" onChange={handleChange} id="title" name='title' className="form-control"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label float-start">detail</label>
                    <textarea name='detail' onChange={handleChange} className="form-control " id="detail"  />
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

export default AddQuiz;


