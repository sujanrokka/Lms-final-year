
import TeacherSidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function AddCourse()
{
    const [cats,setCats]=useState([]);
    const [courseData,setCourseData]=useState({
        category:'',
        title:'',
        description:'',
        f_img:'', 
        techs:'' 
    });

    //fetch category when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/category/')
            .then((res)=>{
             setCats(res.data);
            
        });
    }catch(error){
        console.log(error);
    }
    },[]);
    
    const handleChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.value
        });
    }
    
    const handleFileChange=(event)=>{
        setCourseData({
           ...courseData,
            [event.target.name]:event.target.files[0]
        });
    }

    const formSubmit=(e)=>{
        e.preventDefault();
        const teacherId=localStorage.getItem('teacherId');
        const formData=new FormData();
        formData.append('category',courseData.category);
        formData.append('teacher',teacherId);
        formData.append('title',courseData.title);
        formData.append('description',courseData.description);
        formData.append('featured_img',courseData.f_img,courseData.f_img.name);
        formData.append('techs',courseData.techs);
        try{
        axios.post(baseUrl+'/course/',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
       .then((res)=>{
        window.location.href='/add-course';
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
            {JSON.stringify(courseData)}
                <h3 className='card-header'>Add Course</h3>
                <div className='card-body'>
                <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label float-start">Category</label>
                   <select name='category' onChange={handleChange} className='form-control'>
                    {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option> })}
                   </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label float-start">Title</label>
                    <input type="text" onChange={handleChange} id="title" name='title' className="form-control"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label float-start">Description</label>
                    <textarea name='description' onChange={handleChange} className="form-control " id="description"  />
                </div>

                <div className="mb-3">
                    <label htmlFor="video" className="form-label float-start">Featured Image</label>
                    <input name='f_img' onChange={handleFileChange} type="file" className="form-control" id="video" />
                </div>
                <div className="mb-3">
                    <label htmlFor="techs" className="form-label float-start">Technologies</label>
                    <textarea name='techs' onChange={handleChange} className="form-control" placeholder="php,python,java" id='techs'  />
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

export default AddCourse;


