import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import Swal from 'sweetalert2';
import {useState,useEffect} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';
function EditCourse()
{
    const [cats,setCats]=useState([]);
    const [courseData,setCourseData]=useState({
        category:'',
        title:'',
        description:'',
        prev_img:'',
        f_img:'',
        techs:'' 
    });

    //fetch category when page load
    const {course_id}=useParams();
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/category/')
            .then((res)=>{
             setCats(res.data);
            
        });
    }catch(error){
        console.log(error);
    }
    //fetch current course data

    try{
        axios.get(baseUrl+'/teacher-course-detail/'+course_id).then((response)=>
        {
           
            setCourseData({
                category:response.data.category,
                title:response.data.title,
                prev_img:response.data.featured_img,
                f_img:'',
                description:response.data.description,
                techs:response.data.techs

        });
        });  
   
         }catch(error){
            console.log(error);
        }
            
    //end
    },[course_id]);
    
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

    const formSubmit=()=>{
        const formData=new FormData();
        formData.append('category',courseData.category);
        formData.append('teacher',1);
        formData.append('title',courseData.title);
        formData.append('description',courseData.description);
        if(courseData.f_img!==''){
             formData.append('featured_img',courseData.f_img,courseData.f_img.name);
        }
        formData.append('techs',courseData.techs);
        try{
        axios.put(baseUrl+'/teacher-course-detail/'+course_id,formData,{
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
                <h3 className='card-header'>Edit Course</h3>
                <div className='card-body'>
                <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label float-start">Category</label>
                   <select name='category' value={courseData.category} onChange={handleChange} className='form-control'>
                    {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option> })}
                   </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label float-start">Title</label>
                    <input type="text" value={courseData.title} onChange={handleChange} id="title" name='title' className="form-control"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label float-start">Description</label>
                    <textarea name='description' value={courseData.description} onChange={handleChange} className="form-control " id="description"  />
                </div>

                <div className="mb-3">
                    <label htmlFor="video" className="form-label float-start">Featured Image</label>
                    <input name='f_img'  onChange={handleFileChange} type="file" className="form-control" id="video" />
                    {courseData.prev_img &&
                   <p className='mt-3'><img src={courseData.prev_img} width="300" /></p>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="techs" className="form-label float-start">Technologies</label>
                    <textarea name='techs' value={courseData.techs} onChange={handleChange} className="form-control" placeholder="php,python,java" id='techs'  />
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

export default EditCourse ;


